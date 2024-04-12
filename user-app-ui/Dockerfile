# Step 1: Build environment
FROM node:18-alpine as build

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your project
COPY . .

# Build your Next.js app
RUN npm run build

# Step 2: Production environment
FROM nginx:alpine

# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/src/app/out /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Nginx will start by default
