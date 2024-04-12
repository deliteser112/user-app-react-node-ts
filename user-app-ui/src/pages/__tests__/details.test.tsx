import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import UserDetailsPage from '../users/details/[id]';
import { useRouter } from 'next/router';
import useUserDetails from '../../hooks/useUserDetails';

// Mocking next/router and useUserDetails
jest.mock('next/router', () => ({
  useRouter: jest.fn()
}));
jest.mock('../../hooks/useUserDetails');

// Optional: Mock child components if they are not relevant to the test
jest.mock('../../components/layout/Layout', () => ({
  __esModule: true,
  default: ({ children }) => <div>{children}</div>
}));
jest.mock('../../components/users/SkeletonUserDetail', () => () => <div>SkeletonUserDetail</div>);

describe('UserDetailsPage', () => {
  it('displays skeleton when data is loading', () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: { id: '123' }
    });
    (useUserDetails as jest.Mock).mockReturnValue({
      user: null,
      isLoading: true,
      error: null
    });

    render(<UserDetailsPage />);
    expect(screen.getByText('SkeletonUserDetail')).toBeInTheDocument();
  });

  it('displays error message when no user is found', () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: { id: '123' }
    });
    (useUserDetails as jest.Mock).mockReturnValue({
      user: null,
      isLoading: false,
      error: 'User not found'
    });

    render(<UserDetailsPage />);
    expect(screen.getByText('User not found')).toBeInTheDocument();
  });

  it('renders user details correctly', () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: { id: '123' }
    });
    (useUserDetails as jest.Mock).mockReturnValue({
      user: { _id: '123', name: 'John Doe', email: 'john@example.com', age: 30 },
      isLoading: false,
      error: null
    });

    render(<UserDetailsPage />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
  });
});
