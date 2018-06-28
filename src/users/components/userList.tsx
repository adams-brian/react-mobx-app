import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';

import UsersState from '../state';
import UserListRow from './userListRow';

interface IUserListProps extends RouteComponentProps<{}> {
  usersState: UsersState;
}

export class UserList extends React.Component<IUserListProps> {
  public render() {
    return (
      <div className="users-container">
        <h1 className="users-header">Users</h1>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th style={{width: '1px'}}/>
            </tr>
          </thead>
          <tbody>
            {this.props.usersState.users.map(user =>
              <UserListRow key={user._id} user={user} editUser={this.editUser} deleteUser={this.deleteUser}/>
            )}
          </tbody>
        </table>
        <Link className="create-user" to="/users/createuser">
          <button type="button" className="btn btn-primary">Create User</button>
        </Link>
      </div>
    );
  }
  private deleteUser = (id: string) => {
    this.props.usersState.deleteUser(id);
  }
  private editUser = (id: string) => {
    this.props.history.push('/users/' + id);
  }
}

export default inject('usersState')(
  observer(
    UserList
  )
);
