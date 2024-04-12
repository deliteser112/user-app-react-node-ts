// src/pages/__tests__/edit.test.tsx

import React from 'react';
import * as userDetailsHook from '../../hooks/useUserDetails';
import { render, screen } from '@testing-library/react';
import UserEditPage from '../users/edit/[id]';
import { useRouter } from 'next/router';

// Mock modules
jest.mock('next/router', () => ({
  useRouter: jest.fn()
}));
jest.mock('../../hooks/useUserDetails');

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
    // Clear all mocks
    jest.clearAllMocks();

    // Setup mocked values for useRouter and useUserDetails
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      query: { id: '1' }
    });

    // Here's the critical part where you mock the return value
    userDetailsHook.default.mockReturnValue(mockUserDetails); // Ensure to use `default` if it's a default export
  });

  it('renders correctly and handles successful update', async () => {
    userDetailsHook.default.mockReturnValue(mockUserDetails);
    render(<UserEditPage />);
  
    // Use findByText to wait asynchronously for the element to appear
    const editUserTitle = await screen.findByText('Update User');
    expect(editUserTitle).toBeInTheDocument();
  
    // Assuming 'John Doe' appears in an input or other part of the form
    const nameInput = screen.getByDisplayValue('John Doe');
    expect(nameInput).toBeInTheDocument();
  });
  
});
