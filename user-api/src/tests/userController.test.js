// tests/userController.test.js

const { createUser } = require('../controllers/userController');
jest.mock('../services/userService'); // Auto-mock the userService
const userService = require('../services/userService');
const httpMocks = require('node-mocks-http');

describe('userController.createUser', () => {
  it('should add a user and return it', async () => {
    // Arrange
    const userData = { name: 'John Doe', email: 'john@example.com', age: 30 };
    const req = httpMocks.createRequest({
      method: 'POST',
      url: '/api/users',
      body: userData,
    });
    const res = httpMocks.createResponse();
  
    userService.createUser.mockResolvedValue(userData);
  
    // Act
    await createUser(req, res);
  
    // Assert
    expect(res.statusCode).toBe(201);
    expect(JSON.parse(res._getData())).toEqual(userData); // Parse the JSON string before comparison
    expect(userService.createUser).toHaveBeenCalledWith(userData);
  });

  // Additional tests can be added here to cover error cases, validation failures, etc.
});
