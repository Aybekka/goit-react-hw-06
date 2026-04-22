import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import contactsReducer from './contactsSlice';
import filtersReducer from './filtersSlice';

// redux-persist/lib/storage Vite'ın ESM ortamında düzgün resolve edilmiyor,
// bu yüzden localStorage'ı doğrudan saran kendi storage objemi yazdım
const storage = {
  getItem: key => Promise.resolve(localStorage.getItem(key)),
  setItem: (key, value) => Promise.resolve(localStorage.setItem(key, value)),
  removeItem: key => Promise.resolve(localStorage.removeItem(key)),
};

const contactsPersistConfig = {
  key: 'contacts',
  storage,
  // sadece items dizisini kaydetmek istiyorum, _persist metadata'sını değil
  whitelist: ['items'],
};

const persistedContactsReducer = persistReducer(contactsPersistConfig, contactsReducer);

export const store = configureStore({
  reducer: {
    contacts: persistedContactsReducer,
    // filtreyi persist etmiyorum, her oturumda sıfırdan başlasın
    filters: filtersReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      // redux-persist kendi aksiyonlarında non-serializable değerler kullanıyor,
      // bu uyarıları susturmak için ignoredActions listesine ekliyorum
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// PersistGate bu persistor'ı kullanarak localStorage okununca uygulamayı açıyor
export const persistor = persistStore(store);
