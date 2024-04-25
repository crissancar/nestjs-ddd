<div align="center">
  <h1>NestJS DDD example</h1>

  <p>
    <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white">
    <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white">
    <img src="https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white">
    <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white">
    <img src="https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white">
    <img src="https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white">
  </p>
</div>

<!-- TABLE OF CONTENTS -->
## Table of Contents

* [Technologies and skills](#technologies-and-skills)
* [Getting Started](#getting-started)
    * [Prerequisites](#prerequisites)
    * [Installation](#installation)
    * [Infrastructure](#infrastructure)
    * [Databases](#databases)
    * [Running the apps](#running-the-apps)
* [Postman](#postman)
* [Documentation](#documentation)

<!-- Technologies -->
## Technologies and skills
As **technologies and tools**, this skeleton API uses:
- **NestJS** as development framework
- **RabbitMQ** as message broker
- **PostgreSQL** as database
- **Swagger** as API documentation tool

As **skills and best practices**, this skeleton API uses:
- **DDD**
- **CQRS**
- **Hexagonal Architecture**
- **Clean Code**
- **SOLID**
- **Design Patterns**

<!-- GETTING STARTED -->
## Getting Started

This is an instructions on setting up the project locally.

### Prerequisites
Have **node** and **nvm** installed. Use version **18**.
```bash
$ nvm use 18.16.0
```

### Installation

1. Clone repository
```bash
$ git clone https://github.com/crissancar/nestjs-ddd-example
```
2. Install dependencies
```bash
$ npm install
```

### Infrastructure
```bash
$ npm run docker:build
```

### Databases

1. Connect to postgres with `pgAdmin` through the URL `http://localhost:5050`
2. Prepare databases launching migrations and seeds
    ```bash
    $ npm run databases:build
    ```

### Running the apps
```bash
$ npm run api:start:dev
```
```bash
$ npm run backoffice:start:dev
```

<!-- POSTMAN -->
## Postman
To get the **Postman collection and environment**, download the files *postman_collection.json* and *postman_environment.json* from the root directory.

<!-- DOCUMENTATION -->
## Documentation
When the api is running, the **endpoints documentation** is available on `http://localhost:9977/docs`