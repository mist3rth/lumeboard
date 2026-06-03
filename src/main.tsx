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
