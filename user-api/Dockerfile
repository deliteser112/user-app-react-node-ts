# Use the official Node.js 14 as a parent image
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application's code
COPY . .

# Your application runs on port 4000. Expose it.
EXPOSE 4000

# Define the command to run your app
CMD [ "npm", "start" ]
