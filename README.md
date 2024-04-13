## User Management

### Project Structure
The project consists of two main parts: the `user-api` directory for the Node.js API development and the `user-app-ui` directory for the React web application.

### Project Components
- `user-api`: Contains the Node.js API implementation.
  - `src`: Holds the source code for the API.
    - `controllers`: Contains controller logic for handling API requests.
    - `models`: Includes data models for the application.
    - `routes`: Defines API routes and connects them to controllers.
    - `services`: Contains business logic services for the API.
    - `middlewares`: Includes middleware functions for error handling and validation.
    - `tests`: Holds test files for the API.
    - `swaggerDefinition.js`: Defines the Swagger API documentation.
    - `swaggerSetup.js`: Sets up Swagger for API documentation.
  - `Dockerfile`: Configuration file for building the API Docker image.
  - `package.json`: Manages project dependencies and scripts.

- `user-app-ui`: Contains the React web application.
  - `src`: Holds the source code for the React application.
    - `components`: Contains reusable UI components.
    - `features`: Includes features such as API integration and state management.
    - `hooks`: Holds custom React hooks for managing state and logic.
    - `pages`: Defines the application pages and routes.
    - `store`: Manages application state using Redux Toolkit.
    - `styles`: Contains global styles for the application.
  - `tailwind.config.ts`: Configuration file for Tailwind CSS.
  - `tsconfig.json`: TypeScript configuration file.
  - `package.json`: Manages project dependencies and scripts.

### Running the Project
#### With Docker
1. Clone the repository to your local machine.
2. Navigate to the root directory of the project.
3. Run `docker-compose up` to build and start the project containers.
4. Access the API at `http://localhost:4000`.
5. Access the Swagger API Documentation at `http://localhost:4000/api-docs`.
6. Access the React web application at `http://localhost:3000`.

#### Without Docker
##### Running the Node.js API:
1. Navigate to the `user-api` directory.
2. Install dependencies by running `npm install`.
3. Set up environment variables by creating a `.env` file based on the `.env.example`.
4. Start the API server by running `npm start`.

##### Running the React Web Application:
1. Navigate to the `user-app-ui` directory.
2. Install dependencies by running `npm install`.
3. Set up environment variables by creating a `.env` file based on the `.env.example`.
4. Start the React development server by running `npm start`.

##### Running the Task 1 Solution (maxProfitK.js):
1. Open a terminal.
2. Navigate to the root directory of the project.
3. Run `node maxProfitK.js` to execute the `maxProfitK` function with test data.

### API Endpoints
- GET `/api/users`: Retrieve a list of users.
- POST `/api/users`: Create a new user.
- GET `/api/users/:id`: Retrieve a specific user by ID.
- PUT `/api/users/:id`: Update an existing user by ID.
- DELETE `/api/users/:id`: Delete a user by ID.

### Project Deployment
The project has been successfully deployed to online servers for both the frontend React web application and the backend Node.js API. Below are the deployment URLs for easy access:

- **Backend API (Swagger Documentation):**
  - [https://user-app-react-node-ts.onrender.com/api-docs/](https://user-app-react-node-ts.onrender.com/api-docs/)
  
- **Frontend React Web Application:**
  - [https://user-react-node-ara.vercel.app/](https://user-react-node-ara.vercel.app/)

### Accessing the Deployed Applications
- **Backend API (Swagger Documentation):**
  - The Swagger documentation provides detailed information about the API endpoints and how to interact with them. You can explore the API documentation at the provided URL.

- **React Web Application:**
  - The React web application allows users to interact with the API endpoints for managing user data. You can access the deployed React application to perform CRUD operations on the user data.

### Additional Notes
- Ensure to set up environment variables as per the `.env.example` files in both directories.
- Make sure to install dependencies using `npm install` in each directory before running the applications.

Feel free to reach out if you have any questions or need further assistance with the project setup!