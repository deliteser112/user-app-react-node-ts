// __mocks__/userService.js

// Mock implementation for createUser
const createUser = jest.fn(userData => Promise.resolve({ ...userData, id: "12345" }));

module.exports = {
  createUser,
};
