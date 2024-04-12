// src/features/users/usersAPI.ts

export interface User {
  _id: string;
  name: string;
  email: string;
  age: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/users';

// Fetch all users
export const fetchUsers = async (page = 1, limit = 10): Promise<any> => {
  const response = await fetch(`${API_URL}?page=${page}&limit=${limit}`);
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
};

// Fetch the data by user id
export const findUserById = async (id: string): Promise<User> => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch user details');
  }
  return response.json();
};

// Create a new user
export const createUser = async (userData: Omit<User, '_id'>): Promise<User> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw { isError: true, data: errorData };
  }
  return response.json();
};

// Update an existing user
export const updateUser = async (id: string, userData: Partial<Omit<User, '_id'>>): Promise<User> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    console.log('errorData', errorData)
    throw { isError: true, data: errorData };
  }
  return response.json();
};

// Delete a user
export const deleteUser = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete user');
  }
};
