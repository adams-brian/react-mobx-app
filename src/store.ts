import { debounce } from 'lodash';
import { action, computed, observable } from 'mobx';
import { generate } from 'shortid';

export interface IUser { 
  _id: string;
  firstname: string;
  lastname: string;
}

export class AppState {
  @observable public counters: number[] = [];
  @observable public users: IUser[] = [];

  private saveCounters: () => void;

  @computed get countersLength() {
    return this.counters.length;
  }

  constructor() {
    this.saveCounters = debounce(this.doSave, 1000);
  }

  @action public increment(index: number) {
    this.counters[index]++;
    this.saveCounters();
  }
  @action public decrement(index: number) {
    this.counters[index]--;
    this.saveCounters();
  }
  @action public reset(index: number) {
    this.counters[index] = 0;
    this.saveCounters();
  }
  @action public remove(index: number) {
    this.counters.splice(index, 1);
    this.saveCounters();
  }
  @action public addCounter() {
    this.counters.push(0);
    this.saveCounters();
  }

  @action public async loadCounters(): Promise<void> {
    this.counters = [];
    const response = await fetch('http://localhost:4000/counters');
    const json = await response.json();
    this.counters = [...json.data];
  }

  @action public deleteUser(id: string) {
    this.users = this.users.filter(user => user._id !== id);
    fetch('http://localhost:4000/users/' + id, {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      method: 'delete'
    })
    .catch((err) => console.log('failed to delete user: ', err));
  }

  @action public async loadUsers(): Promise<void> {
    console.log('loading users');
    this.users = [];
    const response = await fetch('http://localhost:4000/users');
    const json = await response.json();
    this.users = [...json.data];
  }

  @action public async createUser(user: IUser) {
    user._id = generate();
    this.users.push(user);
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

  @action public updateUser(user: IUser) {
    this.users.splice(this.users.findIndex(u => u._id === user._id), 1, user);
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

  private doSave() {
    console.log('saving counters: ' + JSON.stringify({counters: this.counters}));
    
    fetch('http://localhost:4000/counters', {
      body: JSON.stringify({counters: this.counters}),
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      method: 'post',
    })
    .catch((err) => console.log('failed to save counters: ', err));
  }
}
