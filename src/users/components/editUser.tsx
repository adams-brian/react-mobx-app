import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';

import UsersState, { IUser } from '../state';

interface IEditUserProps extends RouteComponentProps<{id: string}> {
  usersState: UsersState;
}

export class EditUser extends React.Component<IEditUserProps, IUser> {
  constructor(props: IEditUserProps) {
    super(props);
    this.state = this.props.usersState.users.find(u => u._id === props.match.params.id) || 
      { _id: '', firstname: '', lastname: '' } as IUser;
  }

  public render() {
    return (
      <div className="edit-user">
        <h1>{this.state._id && this.state._id.length > 0 ? 'Edit' : 'Create'} User</h1>
        <form>
          <div className="form-group">
            <label htmlFor="firstname">Firstname</label>
            <input
              placeholder="Firstname"
              type="text"
              className="form-control"
              name="firstname"
              id="firstname"
              value={this.state.firstname}
              onChange={this.inputChanged}
              required={true}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastname">Lastname</label>
            <input
              placeholder="Lastname"
              type="text"
              className="form-control"
              name="lastname"
              id="lastname"
              value={this.state.lastname}
              onChange={this.inputChanged}
              required={true}
            />
          </div>
          <div>
            <Link to="/users">
              <button type="button" className="btn btn-secondary">Cancel</button>
            </Link>
            {' '}
            <button 
              className="btn btn-primary" 
              type="submit" 
              onClick={this.submit} 
              disabled={this.state.firstname.length === 0 || this.state.lastname.length === 0}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }

  private inputChanged = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    } as Pick<IUser, keyof IUser>);
  }

  private submit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (this.state._id && this.state._id.length > 0) {
      this.props.usersState.updateUser(this.state);
    }
    else {
      this.props.usersState.createUser(this.state);
    }
    this.props.history.push('/users');
  }
}

export default inject('usersState')(
  observer(
    EditUser
  )
);
