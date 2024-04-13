// src/features/users/usersAPI.ts

import { User } from '../../types/user';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://user-app-react-node-ts.onrender.com/api/users';

interface ApiResponse<T> {
  users: any;
  totalPages: number;
  data: T;
}

interface ApiError {
  isError: true;
  status: number;
  message: string;
  data?: any;
}

// Utility function for making API requests
async function fetchApi<T>(url: string, options?: RequestInit): Promise<T | null> {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch {
      errorData = {};
    }
    throw {
      isError: true,
      status: response.status,
      message: response.statusText,
      data: errorData,
    } as ApiError;
  }

  // Handle no content
  if (response.status === 204) {
    return null;
  }

  return response.json() as Promise<T>;
}

// Fetch all users with pagination
export const fetchUsers = (page = 1, limit = 10): Promise<ApiResponse<User[]>> => {
  return fetchApi<ApiResponse<User[]>>(`${API_URL}?page=${page}&limit=${limit}`);
};

// Fetch user by ID
export const findUserById = (id: string): Promise<User> => {
  return fetchApi<User>(`${API_URL}/${id}`);
};

// Create a new user
export const createUser = (userData: Omit<User, '_id'>): Promise<User> => {
  return fetchApi<User>(API_URL, {
    method: 'POST',
    body: JSON.stringify(userData),
  });
};

// Update an existing user
export const updateUser = (id: string, userData: Partial<Omit<User, '_id'>>): Promise<User> => {
  return fetchApi<User>(`${API_URL}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(userData),
  });
};

// Delete a user
export const deleteUser = (id: string): Promise<void> => {
  return fetchApi<void>(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
};
