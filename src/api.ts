import { debounce } from 'lodash';

import { IUser } from './store';

export interface IApi {
  loadCounters: () => Promise<number[]>;
  saveCounters: (counters: number[]) => void;
  loadUsers: () => Promise<IUser[]>;
  createUser: (user: IUser) => void;
  updateUser: (user: IUser) => void;
  deleteUser: (id: string) => void;
}

export class Api implements IApi {

  public saveCounters: (counters: number[]) => void;

  constructor() {
    this.saveCounters = debounce(this.doSave, 1000);
  }

  public async loadCounters(): Promise<number[]> {
    const response = await fetch('http://localhost:4000/counters');
    const json = await response.json();
    return [...json.data];
  }

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
    console.log('loading users');
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

  private doSave(counters: number[]) {
    console.log('saving counters: ' + JSON.stringify({counters}));
    
    fetch('http://localhost:4000/counters', {
      body: JSON.stringify({counters}),
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      method: 'post',
    })
    .catch((err) => console.log('failed to save counters: ', err));
  }
}
