# Nx Microservice w/ Docker

This project is a sample application with microservice architecture, websocket, and Docker. There are three applications in this workspace:

- `order-web`: Frontend application (Angular)
- `order-api`: Backend RESTful application + Order microservice + Order Websocket Gateway
- `payment-service`: Payment service

# Prerequisite

- Docker

# Local Development

- Clone this repo
- `npm install`
- `npm run start:dev`

> There is a `proxy.conf` for local development that will proxy the `/api` and `/socket.io` to `localhost:8877`

# Ports

- Order:

  - Frontend: `localhost:4200`
  - API: `localhost:8877/api`
  - SwaggerUI: `localhost:8877/api/docs`
  - Websocket: `localhost:8877`
  - Microservice: `localhost:8876`

- Payment:
  - Microservice: `localhost:8875`

# References

👇 See demo here 👇

[![DigitalOcean Referral Badge](https://web-platforms.sfo2.cdn.digitaloceanspaces.com/WWW/Badge%201.svg)](http://147.182.253.160:8080/dashboard)

- [NestJS Microservices Docker](https://github.com/alibghz/nestjs-microservices-docker)
- [Nx and Node Microservices](https://blog.nrwl.io/nx-and-node-microservices-b6df3cd1bad6)
