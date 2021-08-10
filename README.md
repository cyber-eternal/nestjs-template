<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

# Template for the [Node.js](http://nodejs.org) applications based on the [Nest.js](http://nestjs.org) framework for building efficient and scalable server-side applications.

## Description

The template is based on Nest.js(v 8.0.5) and TypeScript. Also has an implementation for the TypeORM to work with the Database, and RabbitMQ for the messaging(the RabbitMQ implementation can be easily removed if you are not using it). The template dockerized as well

## Configurations

The all configurations are in the `./config` folder. The existing configs

- app.ts - Application configs, like port, host, env and so one
- database.ts - The database and TypeORM configurations
- amqp.ts - RabbitMQ configuration

## Dependencies installation

```bash
$ yarn
```

## Environment variables configuration

```bash
$ cp .env.example .env
```

## Perform migrations in your database using TypeORM

The command will run the all migrations from the `./migrations` folder

```bash
$ yarn migration:run
```

## Running the app

```bash
# development
$ yarn start:dev

# debug
$ yarn start:debug

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Run in Docker Container

```bash
$ docker-compose up

# OR, to run in background
$ docker-compose up -d
```

## Adminer

to manage the MariaDB will be available on http://localhost:8081/

## Swagger UI

http://localhost:3001/api/doc

## Stay in touch

- Author - [Cyber-Eternal](https://github.com/cyber-eternal)
- Website - [https://cyber-eternal.github.io/](https://cyber-eternal.github.io/)

## License

Nest is [MIT licensed](https://github.com/cyber-eternal/nestjs-template/blob/master/LICENSE).
