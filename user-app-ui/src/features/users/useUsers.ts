// src/features/users/useUsers.ts
import { useQuery } from 'react-query';
import { fetchUsers } from './usersAPI';

export const useUsers = () => useQuery('users', fetchUsers);
