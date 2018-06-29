import { observe } from 'mobx';
import * as sinon from 'sinon';

import UsersState from './state';

const users = [
  {
    _id: '123',
    firstname: 'abc',
    lastname: 'def'
  },
  {
    _id: '456',
    firstname: 'hij',
    lastname: 'klm'
  },
  {
    _id: '789',
    firstname: 'nop',
    lastname: 'qrs'
  }
];

describe('UsersState', () => {
  
  let createUser: sinon.SinonSpy;
  let deleteUser: sinon.SinonSpy;
  let loadUsers: sinon.SinonSpy;
  let updateUser: sinon.SinonSpy;
  let usersState: UsersState;

  beforeEach(() => {
    createUser = sinon.fake();
    deleteUser = sinon.fake();
    loadUsers = sinon.fake.resolves(users);
    updateUser = sinon.fake();
    usersState = new UsersState({
      createUser,
      deleteUser,
      loadUsers,
      updateUser
    });
  });

  it('loads users', () => {
    expect(usersState.users).toEqual([]);
    expect(loadUsers.called).toBe(false);
    return usersState.loadUsers().then(data => {
      expect(loadUsers.calledOnce).toBe(true);
      expect(usersState.users).toEqual(users);
    });
  });

  describe('once loaded', () => {

    beforeEach(() => {
      return usersState.loadUsers();
    });

    it('creates users', () => {
      const user = {
        _id: '',
        firstname: 'newfirst',
        lastname: 'newlast'
      };
      expect(usersState.users).toEqual(users);
      expect(createUser.called).toBe(false);
      usersState.createUser(user);
      const newUserIndex = usersState.users.length - 1;
      expect(usersState.users.slice(0, newUserIndex)).toEqual(users);
      expect(usersState.users[newUserIndex].firstname).toBe(user.firstname);
      expect(usersState.users[newUserIndex].lastname).toBe(user.lastname);
      expect(usersState.users[newUserIndex]._id.length > 0).toBe(true);
      expect(createUser.calledOnce).toBe(true);
    });

    it('deletes users', () => {
      expect(usersState.users).toEqual(users);
      expect(deleteUser.called).toBe(false);
      usersState.deleteUser('456');
      expect(usersState.users).toEqual([users[0], users[2]]);
      expect(deleteUser.calledOnce).toBe(true);
    });

    it('updates users', () => {
      const user = {
        _id: '456',
        firstname: 'updatedfirst',
        lastname: 'updatedlast'
      };
      expect(usersState.users).toEqual(users);
      expect(updateUser.called).toBe(false);
      usersState.updateUser(user);
      expect(usersState.users).toEqual([users[0], user, users[2]]);
      expect(updateUser.calledOnce).toBe(true);
    });

    it('makes users observable', () => {
      let changeDetected = false;
      const disposer = observe(usersState.users, () => {
        changeDetected = true;
      });
      expect(changeDetected).toBe(false);
      usersState.deleteUser('456');
      expect(changeDetected).toBe(true);
      disposer();
    });

  });
});
