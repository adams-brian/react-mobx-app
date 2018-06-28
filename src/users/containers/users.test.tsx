import { mount, shallow } from 'enzyme';
import * as React from 'react';
import { MemoryRouter } from 'react-router';
import * as sinon from 'sinon';

import UsersState from '../state';
import Users from './users';

let usersState: UsersState;

beforeEach(() => {
  usersState = new UsersState({
    createUser: sinon.fake(),
    deleteUser: sinon.fake(),
    loadUsers: sinon.fake.resolves([]),
    updateUser: sinon.fake()
  });
  sinon.spy(usersState, 'loadUsers');
});

describe("users", () => {
  it('renders as expected', () => {
    const component = shallow(<Users usersState={usersState} />);
    expect(component).toMatchSnapshot();
  });
  it('calls loadUsers', () => {
    expect((usersState.loadUsers as sinon.SinonSpy).called).toBe(false);
    mount(
      <MemoryRouter>
        <Users usersState={usersState} />
      </MemoryRouter>
    );
    expect((usersState.loadUsers as sinon.SinonSpy).calledOnce).toBe(true);
  });
});
