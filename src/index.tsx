import { Provider } from 'mobx-react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import App from './App';
import CountersApi from './counters/api';
import CountersState from './counters/state';
import UsersApi from './users/api';
import UsersState from './users/state';

const countersState = new CountersState(new CountersApi());
const usersState = new UsersState(new UsersApi());
ReactDOM.render(
  <Provider countersState={countersState} usersState={usersState}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
