# Todo GraphQL API

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

Simple Todo GraphQL API written with NestJs NodeJs Framework. App functionalities are
- Authentication
- Authorization
- Todo Creation
- Todo Fetch

### Design assumptions

1. Login username and password are both _strings_ of any length
2. Users and Roles are created at Runtime using fake data

---

## Instructions

Download and unzip file from repository. Open in your IDE. Create files `.env` and `docker.env` for your configurations. File contents should look like so:
```
### <<<<<<<<<<<<<<<< .Env Start >>>>>>>>>>>>>>> ###
NODE_ENV=development
PORT=5000
JWT_KEY=<yourjwtkey>

DATABASE_URL="mysql://<user>:<password>@localhost:3306/todo_db?schema=public"
### <<<<<<<<<<<<<<<< .Env End >>>>>>>>>>>>>>> ###

### <<<<<<<<<<<<<<<< .Docker.env Start >>>>>>>>>>>>>>> ###
NODE_ENV=development
PORT=5000
JWT_KEY=<yourjwtkey>

DATABASE_URL="mysql://<user>:<password>@mysql:3306/todo_db?schema=public"
### <<<<<<<<<<<<<<<< .Docker.env End >>>>>>>>>>>>>>> ###
```
The application runs different services as docker containers, so be sure to have __Docker__ installed globally on your PC. See
instructions on how to install for [Mac](https://docs.docker.com/desktop/mac/install/)
and [Windows](https://docs.docker.com/desktop/windows/install/). _Docker-Compose_ is used to orchestrate the service's containerization.

### <a id="requirements">Requirements</a>

- Node.js >= 16
- @NestJs/Cli >= 9
- Docker >= 4.16.2

### <a id="database">Database</a>

The application uses MySQL database. The database configuration parameters are in the __.env__ and __docker.env__ files.

### <a id="build">Build</a>

To build the application, open a terminal in the root directory of the application, then run the command `COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose build` or `./docker.sh`.
Where `docker.sh` bash file in the root directory of the application. Be sure to grant the file executable permissions e.g., on __MAC__, run `chmod +x docker.sh`. This will generate a docker image.

### <a id="run">Run</a>
To the run the application, open a terminal on the application root directory:
- To run app in dev mode - run `yarn start:dev`
- To run app in prod mode - run `yarn start`
- To run app in debug mode - run `yarn start:debug`
- To run app containers - run `docker-compose up`

### <a id="test">Test</a>

To run tests, simply run on terminal `yarn test:e2e`.

### <a id="api-calls">GraphQL API Queries</a>

_Login_

```graphql
mutation LoginUser($loginUserInput:LoginUserInput!){
  loginUser(loginUserInput:$loginUserInput){
    token
  }
}
```

_Create Todo_

```graphql
mutation CreateTodo($createTodoInput:CreateTodoInput!){
  createTodo(createTodoInput:$createTodoInput){
    id
    title
    description
    completed
  }
}
```

_Find Todo_

```graphql
query Todo($id:Int!){
  todo(id:$id){
    id
    title
    description
    completed
  }
}
```

_Find Todos_

```graphql
query Todo{
  todos{
    id
    title
    description
    completed
  }
}
```

_Filter Todos_

```graphql
query Todo($filterBy:FilterTodosInput){
  todos(filterBy:$filterBy){
    id
    title
    description
    completed
  }
}
```
