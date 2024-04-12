import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store/store';

// Custom hook that returns the dispatch function with the correct type
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
