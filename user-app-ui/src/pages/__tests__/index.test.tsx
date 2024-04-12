import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from '../index';

// It's a good practice to mock child components if they are not relevant to the test.
// This helps in isolating the test to check only the functionality of the HomePage component.
jest.mock('../../components/layout/Layout', () => {
  return {
    __esModule: true, // This is needed to correctly mock a module with a default export.
    default: ({ children, title }) => (
      <div data-testid="layout">
        {title && <title>{title}</title>}
        {children}
      </div>
    )
  };
});
jest.mock('../../components/users/UsersList', () => () => <div data-testid="users-list"/>);

describe('HomePage', () => {
  it('renders without crashing and contains the correct title', () => {
    render(<HomePage />);
    // Check that the layout is used and contains the expected title.
    expect(screen.getByTestId('layout')).toBeInTheDocument();
    expect(screen.getByText(/User | Home/i)).toBeInTheDocument();
    // Optionally, check if UsersList is rendered.
    expect(screen.getByTestId('users-list')).toBeInTheDocument();
  });
});
