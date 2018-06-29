import * as fetchMock from 'fetch-mock';

import UsersApi from './api';

const users = [
  {
    _id: '123',
    firstname: 'abc',
    lastname: 'def'
  },
  {
    _id: '456',
    firstname: 'ghi',
    lastname: 'jkl'
  }
];

describe('api', () => {
  
  let usersApi: UsersApi;

  beforeEach(() => {
    usersApi = new UsersApi();
  });

  afterEach(() => {
    fetchMock.restore();
  });

  it('deletes users', () => {
    const id = '123';
    fetchMock.deleteOnce('http://localhost:4000/users/' + id, 200);
    usersApi.deleteUser(id);
    expect(fetchMock.done()).toBe(true);
  });

  it('loads users', () => {
    fetchMock.getOnce('http://localhost:4000/users', { data: users });
    return usersApi.loadUsers().then(returnedUsers => {
      expect(returnedUsers).toEqual(users);
      expect(fetchMock.done()).toBe(true);
    });
  });

  it('creates users', () => {
    fetchMock.putOnce(
      (url, opts: RequestInit) =>
        url === 'http://localhost:4000/users' &&
        opts.body === JSON.stringify(users[0])
      , 200);
    usersApi.createUser(users[0]);
    expect(fetchMock.done()).toBe(true);
  });

  it('updates users', () => {
    fetchMock.postOnce(
      (url, opts: RequestInit) =>
        url === 'http://localhost:4000/users/' + users[0]._id &&
        opts.body === JSON.stringify(users[0])
      , 200);
    usersApi.updateUser(users[0]);
    expect(fetchMock.done()).toBe(true);
  });
});
