import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import {
//   persistReducer,
//   persistStore,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from 'redux-persist';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { authSlice } from './auth/authSlice';

// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage,
// };

const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer
})

// export const reducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: rootReducer,
  // middleware: getDefaultMiddleware =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  //     },
  //   }),
});

// export const persistor = persistStore(store);

