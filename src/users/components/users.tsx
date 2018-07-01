import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import loading from '../../common/components/loading';
import UsersState from '../state';
import EditUser from './editUser';
import UserList from './userList';

const Users = (props: {usersState: UsersState}) => (
  <Switch>
    <Route exact={true} path="/users" component={UserList}/>
    <Route exact={true} path="/users/createuser" component={EditUser}/>
    <Route path="/users/:id" component={EditUser}/>
  </Switch>
);
export { Users };

export default loading<UsersState, {}>('usersState', (usersState) => usersState.loadUsers())(
  Users
);
