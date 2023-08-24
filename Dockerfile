###############################
### BUILD FOR LOCAL DEVELOPMENT
###############################
FROM node:18 AS development

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}


# Create app directory
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY package.json ./
COPY yarn.lock ./

# Install app dependencies using the `npm ci` command instead of `npm install`

RUN yarn install --immutable --immutable-cache --check-cache

# Bundle app source
COPY . .


# Use the node user from the image (instead of the root user)
USER node

EXPOSE 3000

CMD [ "npm", "serve" ]



##########################
### BUILD FOR PRODUCTION
##########################

FROM node:18 AS build

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

# In order to run `npm run build` we need access to the Nest CLI.
# The Nest CLI is a dev dependency,
# In the previous development stage we ran `npm ci` which installed all dependencies.
# So we can copy over the node_modules directory from the development image into this build image.
COPY --from=development /usr/src/app/node_modules ./node_modules

COPY . .

# Run the build command which creates the production bundle
RUN npm run build

# Running `npm ci` removes the existing node_modules directory.
# Passing in --only=production ensures that only the production dependencies are installed.
# This ensures that the node_modules directory is as optimized as possible.
RUN yarn install --immutable --immutable-cache --check-cache --production && yarn cache clean --force

USER node

###################
# PRODUCTION
###################

FROM node:18 AS production

# Copy the bundled code from the build stage to the production image
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package.json ./package.json
COPY --from=build /usr/src/app/dist ./dist


EXPOSE 3000

CMD [ "node", "dist/server.js" ]
