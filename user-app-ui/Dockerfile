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
 FROM node:18-alpine
 
 WORKDIR /usr/src/app
 
 COPY --from=build /usr/src/app/public ./public
 COPY --from=build /usr/src/app/.next ./.next
 COPY --from=build /usr/src/app/node_modules ./node_modules
 COPY --from=build /usr/src/app/package.json ./package.json
 
 EXPOSE 3000
 
 CMD ["npm", "start"]
 