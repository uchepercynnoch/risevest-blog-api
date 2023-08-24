# Blog API

- [Introduction](#intro)
    - [Design assumptions](#design-assumptions)
- [Instructions](#instructions)
    - [Requirements](#requirements)
    - [Database](#database)
    - [Build](#build)
    - [Run](#run)
    - [Test](#test)
    - [API endpoints](#api-calls)
    - [Known Issues](#issues)

## <a id="intro">Introduction</a>

Simple Blog REST API written with Express and Node.js. App functionalities are
- Authentication
- User Creation/View
- Post Creation/View
- Comment Creation/View

### Design assumptions

1. The default login credential is only the __userId__ which can be any number from 1 to 5
2. Users, Posts and Comments are persisted on __App Run__

---

## Instructions

Download and unzip file from repository. Open in your IDE. Create files `.env` and `docker.env` for your configurations. File contents should look like so:
```
### <<<<<<<<<<<<<<<< .Env Start >>>>>>>>>>>>>>> ###
NODE_ENV=development
PORT=5000

DEV_DB_HOST=<your host>
DEV_DB_USER=<your user>
DEV_DB_PASSWORD=<your password>
DEV_DB_DATABASE=rise_blog_dev_db
DEV_DB_PORT=5432
DEV_DB_DIALECT=postgres

TEST_DB_HOST=<your host>
TEST_DB_USER=<your user>
TEST_DB_PASSWORD=<your password>
TEST_DB_DATABASE=rise_blog_test_db
TEST_DB_PORT=5432
TEST_DB_DIALECT=postgres

DEV_REDIS_HOST=<your host>
DEV_REDIS_DATABASE=0
DEV_REDIS_PORT=6379

TEST_REDIS_HOST=<your host>
TEST_REDIS_DATABASE=1
TEST_REDIS_PORT=6379

DEV_JWT_SECRET=my_dev_secret
DEV_JWT_EXPIRY=24h

TEST_JWT_SECRET=my_test_secret
TEST_JWT_EXPIRY=1h

### <<<<<<<<<<<<<<<< .Env End >>>>>>>>>>>>>>> ###

### <<<<<<<<<<<<<<<< .Docker.env Start >>>>>>>>>>>>>>> ###
NODE_ENV=development
PORT=5000

DEV_DB_HOST=postgres
DEV_DB_USER=admin
DEV_DB_PASSWORD=admin
DEV_DB_DATABASE=rise_blog_dev_db
DEV_DB_PORT=5432
DEV_DB_DIALECT=postgres

TEST_DB_HOST=postgres
TEST_DB_USER=admin
TEST_DB_PASSWORD=admin
TEST_DB_DATABASE=rise_blog_test_db
TEST_DB_PORT=5432
TEST_DB_DIALECT=postgres

DEV_REDIS_HOST=redis
DEV_REDIS_DATABASE=0
DEV_REDIS_PORT=6379

TEST_REDIS_HOST=redis
TEST_REDIS_DATABASE=1
TEST_REDIS_PORT=6379

DEV_JWT_SECRET=my_dev_secret
DEV_JWT_EXPIRY=24h

TEST_JWT_SECRET=my_test_secret
TEST_JWT_EXPIRY=1h


### <<<<<<<<<<<<<<<< .Docker.env End >>>>>>>>>>>>>>> ###
```
The application runs different services as docker containers, so be sure to have __Docker__ installed globally on your PC. See
instructions on how to install for [Mac](https://docs.docker.com/desktop/mac/install/)
and [Windows](https://docs.docker.com/desktop/windows/install/). _Docker-Compose_ is used to orchestrate the service's containerization.

### <a id="requirements">Requirements</a>

- Node.js >= 16
- PostgresDB >= 15
- Docker >= 4.16.2

### <a id="database">Database</a>

The application uses Postgresql database. The database configuration parameters are in the __.env__ and __docker.env__ files.

### <a id="build">Build</a>

To build the application, open a terminal in the root directory of the application, then run the command `COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose build`.

### <a id="run">Run</a>
To the run the application, open a terminal on the application root directory:
- To run app in dev mode - run `yarn serve:dev`
- To run app in prod mode - run `yarn serve`
- To run app containers - run `docker-compose up`

### <a id="test">Test</a>

To run tests, simply run on terminal `yarn test`.

### <a id="api-calls">API endpoints</a>
The application endpoints are well documented with [Swagger](https://swagger.io/) openapi. To access the docs, open the link e.g __http://localhost:5000/api/v1/docs__ on your web browser.

