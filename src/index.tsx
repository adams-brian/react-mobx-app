import { Provider } from 'mobx-react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import { App } from './App';
import { AppState } from './store';

const appState = new AppState();
ReactDOM.render(
  <Provider appState={appState}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
