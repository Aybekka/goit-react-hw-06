import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Provider dışta olmak zorunda — PersistGate kendi içinde store'a erişiyor */}
    <Provider store={store}>
      {/* localStorage'dan state yüklenene kadar uygulamayı bekletiyor, loading={null} çünkü an
      da açılıyor */}
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>
);
