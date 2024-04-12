
# Project Documentation

Welcome to the comprehensive documentation for our full-stack application, which includes a backend API (user-api) and a frontend UI (user-app-ui). This guide covers setting up the project, dockerizing the frontend and backend, implementing pagination, and ensuring compatibility with specific Node.js versions for Next.js.

## Project Structure

The project is structured into two main directories:

- user-api: Contains the backend Node.js API.
- user-app-ui: Houses the frontend React application.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- Docker and Docker Compose
- Node.js (version >=18.17.0 for Next.js compatibility)
- npm

## Backend (user-api)

The backend API is built with Node.js and Express. It provides endpoints for managing user data, including CRUD operations and pagination.

### Dockerization

A Dockerfile is provided to containerize the backend service.

```Dockerfile
FROM node:14
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4000
CMD [ "npm", "start" ]
```

## Frontend (user-app-ui)

The frontend UI is a React application utilizing Next.js. It interacts with the backend API to display and manage user data, supporting operations like viewing, adding, editing, and deleting users.

### Dockerization

Given the requirement for Node.js version >=18.17.0 for Next.js, the Dockerfile in the frontend directory ensures compatibility.

```Dockerfile
# Build environment
FROM node:18-alpine as build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production environment
FROM nginx:alpine
COPY --from=build /usr/src/app/out /usr/share/nginx/html
EXPOSE 80
```

### Docker Compose

The `docker-compose.yml` file orchestrates both the frontend and backend services, ensuring they are linked and can communicate with each other.

```yaml
version: '3.8'
services:
  user-api:
    build: ./user-api
    ports:
      - "4000:4000"
  user-app-ui:
    build: ./user-app-ui
    ports:
      - "80:80"
    depends_on:
      - user-api
```

## Running the Project

To start the project, navigate to the root directory where `docker-compose.yml` is located and run:

```bash
docker-compose up --build
```

The frontend will be accessible at http://localhost, and the backend API will be available at http://localhost:4000.

## Conclusion

This documentation outlines the setup, dockerization, pagination implementation, and compatibility considerations for the project. Follow the instructions to get started and explore the functionalities of our full-stack application.
