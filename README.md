# Nx Microservice w/ Docker

This project is a sample application with microservice architecture, websocket, and Docker. There are three applications in this workspace:

- `order-web`: Frontend application (Angular)
- `order-api`: Backend RESTful application + Order microservice + Order Websocket Gateway
- `payment-service`: Payment service

# Prerequisite

- Docker

# Steps

- Clone this repo
- `npm install`
- `npm run build:all` to build all apps
- `npm run start:dev`. Alternatively, you can also invoke `docker-compose up` directly from the terminal

# References

- [NestJS Microservices Docker](https://github.com/alibghz/nestjs-microservices-docker)
- [Nx and Node Microservices](https://blog.nrwl.io/nx-and-node-microservices-b6df3cd1bad6)
