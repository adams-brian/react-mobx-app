import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import { UsersState } from '../state';
import { EditUser } from './editUser';
import { UserList } from './userList';

export class Users extends React.Component<{usersState: UsersState}> {
  public render() {
    return (
      <Switch>
        <Route exact={true} path="/users" component={UserList}/>
        <Route exact={true} path="/users/createuser" component={EditUser}/>
        <Route path="/users/:id" component={EditUser}/>
      </Switch>
    );
  }
}
