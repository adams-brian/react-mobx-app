import { mount, shallow } from 'enzyme';
import { Provider } from 'mobx-react';
import * as React from 'react';
import * as sinon from 'sinon';

import CountersState from '../state';
import WrappedCounters, { Counters } from './counters';

describe("Counters", () => {

  type propFunction = (index: number) => void;

  let countersState: CountersState;

  beforeEach(() => {
    countersState = new CountersState({
      loadCounters: sinon.fake.resolves([5,1,4,2,3]),
      saveCounters: sinon.fake()
    });
    sinon.spy(countersState, 'increment');
    sinon.spy(countersState, 'decrement');
    sinon.spy(countersState, 'reset');
    sinon.spy(countersState, 'remove');
    sinon.spy(countersState, 'addCounter');
    return countersState.loadCounters();
  });

  it('renders as expected', () => {
    const component = shallow(<Counters countersState={countersState} />);
    expect(component).toMatchSnapshot();
  });

  it('calls addCounter on the state', () => {
    const component = shallow(<Counters countersState={countersState} />);
    expect((countersState.addCounter as sinon.SinonSpy).called).toBe(false);
    component.find('.add-counter').simulate('click');
    expect((countersState.addCounter as sinon.SinonSpy).calledOnce).toBe(true);
  });

  it('calls increment on the state', () => {
    const component = shallow(<Counters countersState={countersState} />);
    expect((countersState.increment as sinon.SinonSpy).called).toBe(false);
    const index = 1;
    (component.find('Counter').at(index).prop('increment') as propFunction)(index);
    expect((countersState.increment as sinon.SinonSpy).calledOnceWithExactly(index)).toBe(true);
  });

  it('calls decrement on the state', () => {
    const component = shallow(<Counters countersState={countersState} />);
    expect((countersState.decrement as sinon.SinonSpy).called).toBe(false);
    const index = 2;
    (component.find('Counter').at(index).prop('decrement') as propFunction)(index);
    expect((countersState.decrement as sinon.SinonSpy).calledOnceWithExactly(index)).toBe(true);
  });

  it('calls reset on the state', () => {
    const component = shallow(<Counters countersState={countersState} />);
    expect((countersState.reset as sinon.SinonSpy).called).toBe(false);
    const index = 3;
    (component.find('Counter').at(index).prop('reset') as propFunction)(index);
    expect((countersState.reset as sinon.SinonSpy).calledOnceWithExactly(index)).toBe(true);
  });

  it('calls remove on the state', () => {
    const component = shallow(<Counters countersState={countersState} />);
    expect((countersState.remove as sinon.SinonSpy).called).toBe(false);
    const index = 4;
    (component.find('Counter').at(index).prop('remove') as propFunction)(index);
    expect((countersState.remove as sinon.SinonSpy).calledOnceWithExactly(index)).toBe(true);
  });

});

describe("WrappedCounters", () => {

  let countersState: CountersState;
  let element: JSX.Element;

  beforeEach(() => {
    countersState = new CountersState({
      loadCounters: sinon.fake.resolves([]),
      saveCounters: sinon.fake()
    });
    sinon.spy(countersState, 'loadCounters');
    element = (
      <Provider countersState={countersState}>
        <WrappedCounters />
      </Provider>
    );
  });

  it('renders as expected', () => {
    const component = mount(element);
    expect(component.find('Provider').first().children()).toMatchSnapshot();
  });

  it('calls loadCounters', () => {
    expect((countersState.loadCounters as sinon.SinonSpy).called).toBe(false);
    mount(element);
    expect((countersState.loadCounters as sinon.SinonSpy).calledOnce).toBe(true);
  });

});
