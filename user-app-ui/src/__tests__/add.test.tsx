import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddUserPage from '../pages/users/add';
import { useRouter } from 'next/router';

// Mocking useRouter
jest.mock('next/router', () => ({
  useRouter: jest.fn()
}));

// Mocking UserForm and its onSave handling
jest.mock('../components/users/UserForm', () => {
  return {
    __esModule: true,
    default: ({ onSuccess }) => (
      <form onSubmit={async (e) => {
        e.preventDefault();
        await Promise.resolve(); // Simulate async action
        onSuccess();
      }}>
        <button type="submit">Submit</button>
      </form>
    )
  };
});

describe('AddUserPage', () => {
  it('renders correctly and submits new user data', async () => {
    const mockedPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockedPush });

    render(<AddUserPage />);

    // Act on form submission
    fireEvent.submit(screen.getByRole('button'));

    // Wait for all asynchronous actions to finish
    await waitFor(() => {
      expect(mockedPush).toHaveBeenCalledWith('/');
    });
  });
});
