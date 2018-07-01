import { shallow } from 'enzyme';
import { createLocation, createMemoryHistory, Location, MemoryHistory } from 'history'
import * as React from 'react';
import * as sinon from 'sinon';

import UsersState from '../state';
import { UserList } from './userList';

type propFunction = (id: string) => void;

interface IMatch {
  params: {id: string};
  isExact: boolean;
  path: string;
  url: string;
}

describe("UserList", () => {

  let element: JSX.Element;
  let history: MemoryHistory;
  let location: Location;
  let match: IMatch;
  let usersState: UsersState;

  beforeEach(() => {
    history = createMemoryHistory();
    sinon.spy(history, 'push');
    location = createLocation('/a/location');
    match = {
      isExact: true,
      params: { id: '123' },
      path: '/a/location',
      url: 'blahblahblah'
    }

    usersState = new UsersState({
      createUser: sinon.fake(),
      deleteUser: sinon.fake(),
      loadUsers: sinon.fake.resolves([
        {
          _id: '123',
          firstname: 'abc',
          lastname: 'def'
        },
        {
          _id: '456',
          firstname: 'hij',
          lastname: 'klm'
        }
      ]),
      updateUser: sinon.fake()
    });
    sinon.spy(usersState, 'deleteUser');
    
    element = (
      <UserList
        history={history}
        location={location}
        match={match}
        staticContext={undefined}
        usersState={usersState}
      />
    )
    return usersState.loadUsers();
  });

  it('renders as expected', () => {
    const component = shallow(element);
    expect(component).toMatchSnapshot();
  });

  it('calls deleteUser on the state', () => {
    const component = shallow(element);
    expect((usersState.deleteUser as sinon.SinonSpy).called).toBe(false);
    (component.find('UserListRow').at(0).prop('deleteUser') as propFunction)('123');
    expect((usersState.deleteUser as sinon.SinonSpy).calledOnceWithExactly('123')).toBe(true);
  });

  it('calls history.push', () => {
    const component = shallow(element);
    expect((history.push as sinon.SinonSpy).called).toBe(false);
    (component.find('UserListRow').at(1).prop('editUser') as propFunction)('456');
    expect((history.push as sinon.SinonSpy).calledOnceWithExactly('/users/456')).toBe(true);
  });

});
