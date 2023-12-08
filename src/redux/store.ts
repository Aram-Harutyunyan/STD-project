import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

// Import your reducers here
// For example:
// import counterReducer from './features/counter/counterSlice';

const store = configureStore({
  reducer: {
    // Add your reducers here
    // For example:
    // counter: counterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;