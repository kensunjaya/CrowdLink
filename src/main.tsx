import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';
import { ActorProvider, AgentProvider } from '@ic-reactor/react';
import { ClientProvider } from './provider/Provider'
import { idlFactory, canisterId } from './declarations/backend';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AgentProvider withProcessEnv>
      <ActorProvider idlFactory={idlFactory} canisterId={canisterId}>
        <ClientProvider>
          <App />
        </ClientProvider>
      </ActorProvider>
    </AgentProvider>
  </React.StrictMode>,
);
