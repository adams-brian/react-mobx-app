import { mount, shallow } from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';

import { CountersState } from '../state';
import { Counters } from './counters';

let countersState: CountersState;

beforeEach(() => {
  countersState = new CountersState({
    loadCounters: sinon.fake.resolves([]),
    saveCounters: sinon.fake()
  });
  sinon.spy(countersState, 'loadCounters');
});

describe("counters", () => {
  it('renders as expected', () => {
    const component = shallow(<Counters countersState={countersState} />);
    expect(component).toMatchSnapshot();
  });
  it('calls appState.loadCounters()', () => {
    expect((countersState.loadCounters as sinon.SinonSpy).called).toBe(false);
    mount(<Counters countersState={countersState} />);
    expect((countersState.loadCounters as sinon.SinonSpy).calledOnce).toBe(true);
  });
});
