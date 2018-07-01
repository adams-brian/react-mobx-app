import { mount, shallow } from 'enzyme';
import { Provider } from 'mobx-react';
import * as React from 'react';
import { MemoryRouter } from 'react-router';
import * as sinon from 'sinon';

import UsersState from '../state';
import EditUser from './editUser';
import UserList from './userList';
import WrappedUsers, { Users } from './users';

describe("Users", () => {

  let usersState: UsersState;
  let element: JSX.Element;

  beforeEach(() => {
    usersState = new UsersState({
      createUser: sinon.fake(),
      deleteUser: sinon.fake(),
      loadUsers: sinon.fake.resolves([]),
      updateUser: sinon.fake()
    });
    element = <Users usersState={usersState} />;
    return usersState.loadUsers();
  });

  it('renders as expected', () => {
    const component = shallow(element);
    expect(component).toMatchSnapshot();
  });
  
  it('routes /users to UserList', () => {
    const component = shallow(element);
    expect(component.find('Route[exact=true][path="/users"]').first().prop('component')).toBe(UserList);
  });

  it('routes /users/createuser to EditUser', () => {
    const component = shallow(element);
    expect(component.find('Route[exact=true][path="/users/createuser"]').first().prop('component')).toBe(EditUser);
  });

  it('routes /users/:id to EditUser', () => {
    const component = shallow(element);
    expect(component.find('Route[path="/users/:id"]').first().prop('component')).toBe(EditUser);
  });

});

describe("WrappedUsers", () => {

  let usersState: UsersState;
  let element: JSX.Element;

  beforeEach(() => {
    usersState = new UsersState({
      createUser: sinon.fake(),
      deleteUser: sinon.fake(),
      loadUsers: sinon.fake.resolves([]),
      updateUser: sinon.fake()
    });
    sinon.spy(usersState, 'loadUsers');
    element = (
      <MemoryRouter>
        <Provider usersState={usersState}>
          <WrappedUsers />
        </Provider>
      </MemoryRouter>
    );
  });

  it('renders as expected', () => {
    const component = mount(element);
    expect(component.find('Provider').first().children()).toMatchSnapshot();
  });

  it('calls loadUsers', () => {
    expect((usersState.loadUsers as sinon.SinonSpy).called).toBe(false);
    mount(element);
    expect((usersState.loadUsers as sinon.SinonSpy).calledOnce).toBe(true);
  });

});