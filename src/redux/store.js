// import { configureStore } from '@reduxjs/toolkit';
// import campersReducer from './campersSlice';
// import filtersReducer from './filtersSlice';
// import favoritesReducer from './favoritesSlice';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

// const persistConfig = {
//   key: 'favorites',
//   storage,
// };

// const persistedFavoritesReducer = persistReducer(persistConfig, favoritesReducer);

// export const store = configureStore({
//   reducer: {
//     campers: campersReducer,
//     filters: filtersReducer,
//     favorites: persistedFavoritesReducer,
//   },
// });

// export const persistor = persistStore(store);

import { configureStore } from '@reduxjs/toolkit';
import campersReducer from './campersSlice';
import filtersReducer from './filtersSlice';
import favoritesReducer from './favoritesSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Конфігурація для redux-persist
const persistConfig = {
  key: 'favorites',
  storage,
};

const persistedFavoritesReducer = persistReducer(persistConfig, favoritesReducer);

export const store = configureStore({
  reducer: {
    campers: campersReducer,
    filters: filtersReducer,
    favorites: persistedFavoritesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ігноруємо дії redux-persist
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);