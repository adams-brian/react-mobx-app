import { mount, shallow } from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';

import { AppState } from '../../store';
import { Counters } from './counters';

let appState: AppState;

beforeEach(() => {
  appState = new AppState({
    createUser: sinon.fake(),
    deleteUser: sinon.fake(),
    loadCounters: sinon.fake.resolves([]),
    loadUsers: sinon.fake.resolves([]),
    saveCounters: sinon.fake(),
    updateUser: sinon.fake()
  });
  sinon.spy(appState, 'loadCounters');
});

describe("counters", () => {
  it('renders as expected', () => {
    const component = shallow(<Counters appState={appState} />);
    expect(component).toMatchSnapshot();
  });
  it('calls appState.loadCounters()', () => {
    expect((appState.loadCounters as sinon.SinonSpy).called).toBe(false);
    mount(<Counters appState={appState} />);
    expect((appState.loadCounters as sinon.SinonSpy).calledOnce).toBe(true);
  });
});
