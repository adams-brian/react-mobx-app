import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { AppState } from '../store';
import { UserListRow } from './userListRow';

interface IUserListProps extends RouteComponentProps<{}> {
  appState: AppState
}

export const UserList = 
inject('appState')(
observer(
  class extends React.Component<IUserListProps> {
    public editUser = (id: string) => {
      this.props.history.push('/users/' + id);
    }
    public deleteUser = (id: string) => {
      this.props.appState.deleteUser(id);
    }
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
              {this.props.appState.users.map(user =>
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
  }
));
