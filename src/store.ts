import { action, computed, observable } from 'mobx';
import { generate } from 'shortid';

import { IApi } from './api';

export interface IUser { 
  _id: string;
  firstname: string;
  lastname: string;
}

export class AppState {
  @observable public counters: number[] = [];
  @observable public users: IUser[] = [];

  @computed get countersLength() {
    return this.counters.length;
  }

  constructor(private api: IApi) { }

  @action public increment(index: number) {
    this.counters[index]++;
    this.api.saveCounters(this.counters);
  }
  @action public decrement(index: number) {
    this.counters[index]--;
    this.api.saveCounters(this.counters);
  }
  @action public reset(index: number) {
    this.counters[index] = 0;
    this.api.saveCounters(this.counters);
  }
  @action public remove(index: number) {
    this.counters.splice(index, 1);
    this.api.saveCounters(this.counters);
  }
  @action public addCounter() {
    this.counters.push(0);
    this.api.saveCounters(this.counters);
  }

  @action public async loadCounters(): Promise<void> {
    this.counters = [];
    this.counters = await this.api.loadCounters();
  }

  @action public deleteUser(id: string) {
    this.users = this.users.filter(user => user._id !== id);
    this.api.deleteUser(id);
  }

  @action public async loadUsers(): Promise<void> {
    this.users = await this.api.loadUsers();
  }

  @action public async createUser(user: IUser) {
    user._id = generate();
    this.users.push(user);
    this.api.createUser(user);
  }

  @action public updateUser(user: IUser) {
    this.users.splice(this.users.findIndex(u => u._id === user._id), 1, user);
    this.api.updateUser(user);
  }
}
