import { shallow } from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';

import UsersState from '../state';
import EditUser from './editUser';
import UserList from './userList';
import Users from './users';

let usersState: UsersState;

beforeEach(() => {
  usersState = new UsersState({
    createUser: sinon.fake(),
    deleteUser: sinon.fake(),
    loadUsers: sinon.fake.resolves([]),
    updateUser: sinon.fake()
  });
  return usersState.loadUsers();
});

describe("users", () => {
  it('renders as expected', () => {
    const component = shallow(<Users usersState={usersState} />);
    expect(component).toMatchSnapshot();
  });
  it('routes /users to UserList', () => {
    const component = shallow(<Users usersState={usersState} />);
    expect(component.find('Route[exact=true][path="/users"]').first().prop('component')).toBe(UserList);
  });
  it('routes /users/createuser to EditUser', () => {
    const component = shallow(<Users usersState={usersState} />);
    expect(component.find('Route[exact=true][path="/users/createuser"]').first().prop('component')).toBe(EditUser);
  });
  it('routes /users/:id to EditUser', () => {
    const component = shallow(<Users usersState={usersState} />);
    expect(component.find('Route[path="/users/:id"]').first().prop('component')).toBe(EditUser);
  });
});
