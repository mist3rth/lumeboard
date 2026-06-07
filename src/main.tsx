import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AudioImmersionProvider } from './contexts/AudioContext';
import { ModalProvider } from './contexts/ModalContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AudioImmersionProvider>
      <ModalProvider>
        <App />
      </ModalProvider>
    </AudioImmersionProvider>
  </StrictMode>,
);

// Enregistrement du Service Worker pour l'optimisation des performances de cache
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/lumeboard/sw.js')
      .then((registration) => {
        console.log('ServiceWorker enregistré avec succès, scope: ', registration.scope);
      })
      .catch((error) => {
        console.error('Échec de l\'enregistrement du ServiceWorker: ', error);
      });
  });
}

