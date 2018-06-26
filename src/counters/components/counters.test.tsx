import { shallow } from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';

import { AppState } from '../../store';
import { Counters } from './counters';

let appState: AppState;

type propFunction = (index: number) => void;

beforeEach(() => {
  appState = new AppState({
    createUser: sinon.fake(),
    deleteUser: sinon.fake(),
    loadCounters: sinon.fake.resolves([5,1,4,2,3]),
    loadUsers: sinon.fake.resolves([
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
    ]),
    saveCounters: sinon.fake(),
    updateUser: sinon.fake()
  });
  sinon.spy(appState, 'increment');
  sinon.spy(appState, 'decrement');
  sinon.spy(appState, 'reset');
  sinon.spy(appState, 'remove');
  sinon.spy(appState, 'addCounter');
  return appState.loadCounters();
});

describe("counters", () => {
  it('renders as expected', () => {
    const component = shallow(<Counters appState={appState} />);
    expect(component).toMatchSnapshot();
  });
  it('calls addCounter on the state', () => {
    const component = shallow(<Counters appState={appState} />);
    expect((appState.addCounter as sinon.SinonSpy).called).toBe(false);
    component.find('.add-counter').simulate('click');
    expect((appState.addCounter as sinon.SinonSpy).calledOnce).toBe(true);
  });
  it('calls increment on the state', () => {
    const component = shallow(<Counters appState={appState} />);
    expect((appState.increment as sinon.SinonSpy).called).toBe(false);
    const index = 1;
    (component.find('Counter').at(index).prop('increment') as propFunction)(index);
    expect((appState.increment as sinon.SinonSpy).calledOnceWithExactly(index)).toBe(true);
  });
  it('calls decrement on the state', () => {
    const component = shallow(<Counters appState={appState} />);
    expect((appState.decrement as sinon.SinonSpy).called).toBe(false);
    const index = 2;
    (component.find('Counter').at(index).prop('decrement') as propFunction)(index);
    expect((appState.decrement as sinon.SinonSpy).calledOnceWithExactly(index)).toBe(true);
  });
  it('calls reset on the state', () => {
    const component = shallow(<Counters appState={appState} />);
    expect((appState.reset as sinon.SinonSpy).called).toBe(false);
    const index = 3;
    (component.find('Counter').at(index).prop('reset') as propFunction)(index);
    expect((appState.reset as sinon.SinonSpy).calledOnceWithExactly(index)).toBe(true);
  });
  it('calls remove on the state', () => {
    const component = shallow(<Counters appState={appState} />);
    expect((appState.remove as sinon.SinonSpy).called).toBe(false);
    const index = 4;
    (component.find('Counter').at(index).prop('remove') as propFunction)(index);
    expect((appState.remove as sinon.SinonSpy).calledOnceWithExactly(index)).toBe(true);
  });
});
