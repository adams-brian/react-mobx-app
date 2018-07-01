import { IUser } from './state';

export interface IUsersApi {
  loadUsers: () => Promise<IUser[]>;
  createUser: (user: IUser) => void;
  updateUser: (user: IUser) => void;
  deleteUser: (id: string) => void;
}

export default class UsersApi implements IUsersApi {

  public deleteUser(id: string) {
    fetch('http://localhost:4000/users/' + id, {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      method: 'delete'
    })
    .catch((err) => console.log('failed to delete user: ', err));
  }

  public async loadUsers(): Promise<IUser[]> {
    const response = await fetch('http://localhost:4000/users');
    const json = await response.json();
    return [...json.data];
  }

  public async createUser(user: IUser) {
    fetch('http://localhost:4000/users', {
        body: JSON.stringify(user),
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        method: 'put'
      })
    .catch((err) => console.log('failed to create user: ', err));
  }

  public updateUser(user: IUser) {
    fetch('http://localhost:4000/users/' + user._id, {
      body: JSON.stringify(user),
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      method: 'post'
    })
    .catch((err) => console.log('failed to delete user: ', err));
  }
}
