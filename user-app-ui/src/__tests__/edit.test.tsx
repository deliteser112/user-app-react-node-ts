// src/pages/__tests__/edit.test.tsx

import React from 'react';
import * as userDetailsHook from '../hooks/useUserDetails';
import { render, screen } from '@testing-library/react';
import UserEditPage from '../pages/users/edit/[id]';
import { useRouter } from 'next/router';

// Mock modules
jest.mock('next/router', () => ({
  useRouter: jest.fn()
}));
jest.mock('../hooks/useUserDetails');

describe('UserEditPage', () => {
  const mockPush = jest.fn();
  const mockUserDetails = {
    user: {
      _id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      age: 30
    },
    isLoading: false,
    error: null
  };

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();

    // Setup mocked values for useRouter and useUserDetails
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      query: { id: '1' }
    });

    (userDetailsHook.default as jest.Mock).mockReturnValue(mockUserDetails);
  });

  it('renders correctly and displays user information', async () => {
    render(<UserEditPage />);
  
    // Verify that the user's name appears correctly in an input or other element
    const nameInput = await screen.findByDisplayValue('John Doe');
    expect(nameInput).toBeInTheDocument();
  
    // Additional assertions can be made here to check for other user details or elements
  });

  // Additional tests can be added to cover loading states, error handling, etc.
});

