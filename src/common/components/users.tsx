import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import { AppState } from '../../store';
import { EditUser } from './editUser';
import { loading } from './loading';
import { UserList } from './userList';

export const Users =
loading<AppState>('appState', (appState) => appState.loadUsers())(
() =>
  <Switch>
    <Route exact={true} path="/users" component={UserList}/>
    <Route exact={true} path="/users/createuser" component={EditUser}/>
    <Route path="/users/:id" component={EditUser}/>
  </Switch>
)
