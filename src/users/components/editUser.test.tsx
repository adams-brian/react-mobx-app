import { shallow } from 'enzyme';
import { createLocation, createMemoryHistory, Location, MemoryHistory } from 'history'
import * as React from 'react';
import * as sinon from 'sinon';

import UsersState from '../state';
import { EditUser } from './editUser';

interface IMatch {
  params: {id: string};
  isExact: boolean;
  path: string;
  url: string;
}

let element: JSX.Element;
let history: MemoryHistory;
let location: Location;
let match: IMatch;
let usersState: UsersState;

beforeEach(() => {
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
      },
      {
        _id: '789',
        firstname: 'nop',
        lastname: 'qrs'
      }
    ]),
    updateUser: sinon.fake()
  });
  sinon.spy(usersState, 'createUser');
  sinon.spy(usersState, 'updateUser');
  return usersState.loadUsers();
})

describe("editUser", () => {

  describe("create user mode", () => {

    beforeEach(() => {
      history = createMemoryHistory();
      sinon.spy(history, 'push');
      location = createLocation('');
      match = {
        isExact: true,
        params: { id: '' },
        path: '',
        url: ''
      }
    
      element = (
        <EditUser
          history={history}
          location={location}
          match={match}
          staticContext={undefined}
          usersState={usersState}
        />
      )
    });

    it('renders as expected', () => {
      const component = shallow(element);
      expect(component).toMatchSnapshot();
    });
    it('calls createUser on the state', () => {
      const component = shallow(element);
      expect((usersState.createUser as sinon.SinonSpy).called).toBe(false);
      expect((history.push as sinon.SinonSpy).called).toBe(false);
      component.find('#firstname').first().simulate('change', { currentTarget: { name: 'firstname', value: 'new' } });
      component.find('#lastname').first().simulate('change', { currentTarget: { name: 'lastname', value: 'user' } });
      component.find('button[type="submit"]').first().simulate('click', { preventDefault: () => { /* noop */ }});
      expect((usersState.createUser as sinon.SinonSpy).calledOnceWithExactly({ _id: '', firstname: 'new', lastname: 'user'})).toBe(true);
      expect((history.push as sinon.SinonSpy).calledOnceWithExactly('/users')).toBe(true);
    });
  });

  describe("edit user mode", () => {

    beforeEach(() => {
      history = createMemoryHistory();
      sinon.spy(history, 'push');
      location = createLocation('');
      match = {
        isExact: true,
        params: { id: '456' },
        path: '',
        url: ''
      }
    
      element = (
        <EditUser
          history={history}
          location={location}
          match={match}
          staticContext={undefined}
          usersState={usersState}
        />
      )
    });

    it('renders as expected', () => {
      const component = shallow(element);
      expect(component).toMatchSnapshot();
    });
    it('calls updateUser on the state', () => {
      const component = shallow(element);
      expect((usersState.updateUser as sinon.SinonSpy).called).toBe(false);
      expect((history.push as sinon.SinonSpy).called).toBe(false);
      component.find('#firstname').first().simulate('change', { currentTarget: { name: 'firstname', value: 'updated' } });
      component.find('#lastname').first().simulate('change', { currentTarget: { name: 'lastname', value: 'user' } });
      component.find('button[type="submit"]').first().simulate('click', { preventDefault: () => { /* noop */ }});
      expect((usersState.updateUser as sinon.SinonSpy).calledOnceWithExactly({ _id: '456', firstname: 'updated', lastname: 'user'})).toBe(true);
      expect((history.push as sinon.SinonSpy).calledOnceWithExactly('/users')).toBe(true);
    });
  });
});
