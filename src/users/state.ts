import { action, observable } from 'mobx';
import { generate } from 'shortid';

import { IUsersApi } from './api';

export interface IUser { 
  _id: string;
  firstname: string;
  lastname: string;
}

export class UsersState {
  @observable public users: IUser[] = [];

  constructor(private api: IUsersApi) { }

  @action public deleteUser(id: string) {
    this.users = this.users.filter(user => user._id !== id);
    this.api.deleteUser(id);
  }

  @action public async loadUsers(): Promise<void> {
    this.users = await this.api.loadUsers();
  }

  @action public async createUser(user: IUser) {
    const newUser = Object.assign({}, user);
    newUser._id = generate();
    this.users.push(newUser);
    this.api.createUser(newUser);
  }

  @action public updateUser(user: IUser) {
    this.users.splice(this.users.findIndex(u => u._id === user._id), 1, user);
    this.api.updateUser(user);
  }
}
