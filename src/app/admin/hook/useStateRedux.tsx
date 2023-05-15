import { TypedUseSelectorHook, useSelector } from 'react-redux';
import type { AdminStoreState } from '../store/store';

export const useAppSelector: TypedUseSelectorHook<AdminStoreState> = useSelector;