import { mount } from 'enzyme';
import { observable } from 'mobx';
import { Provider } from 'mobx-react';
import * as React from 'react';
import * as sinon from 'sinon';

import loading from './loading';

class SimpleState {
  @observable public message: string = '';
  public delay: number = 0;
  public shouldReject: boolean = false;
  public load(): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(
        () => {
          if (!this.shouldReject) {
            this.message = 'loaded';
            resolve();
          }
          else {
            reject(new Error('error message'));
          }
        },
        this.delay
      );
    });
  }
}

const SimpleComponent = (props: {theState: SimpleState}) =>
  <div>message: {props.theState.message}</div>

const Wrapper = loading<SimpleState, {}>('theState', theState => theState.load())(
  SimpleComponent
);

describe("loading", () => {

  let state: SimpleState;
  let element: JSX.Element;
  let clock: sinon.SinonFakeTimers;

  beforeEach(() => {
    clock = sinon.useFakeTimers();
    state = new SimpleState();
    element = 
      <Provider theState={state}>
        <Wrapper />
      </Provider>;
  });

  afterEach(() => {
    clock.restore();
  });

  it('renders as expected', () => {
    const component = mount(element);
    expect(component).toMatchSnapshot();
  });

  it('should render null until the promise resolves for load times < 500ms', () => {
    state.delay = 200;
    const component = mount(element);
    return new Promise((resolve) => {
      expect(component.html()).toMatchSnapshot();
      clock.tick(state.delay);
      resolve();
    }).then(() => {
      expect(component.html()).toMatchSnapshot();
      clock.tick(5000);
    }).then(() => {
      expect(component.html()).toMatchSnapshot();
    });
  });

  it('should render null for 500ms, then loading until the promise resolves for load times > 500ms', () => {
    state.delay = 2000;
    const component = mount(element);
    return new Promise((resolve) => {
      expect(component.html()).toMatchSnapshot();
      clock.tick(500);
      resolve();
    }).then(() => {
      expect(component.html()).toMatchSnapshot();
      clock.tick(state.delay - 500);
    }).then(() => {
      expect(component.html()).toMatchSnapshot();
    });
  });

  it('should render the error message if the promise is rejected', () => {
    state.delay = 1000;
    state.shouldReject = true;
    const component = mount(element);
    // use promises to allow callbacks in loading to run between ticks
    return new Promise((resolve) => {
      expect(component.html()).toMatchSnapshot();
      clock.tick(500);
      resolve();
    }).then(() => {
      expect(component.html()).toMatchSnapshot();
      clock.tick(state.delay - 500);
    }).then(() => {
      // we need an extra then for the reject to be caught
    })
    .then(() => {
      expect(component.html()).toMatchSnapshot();
    });
  });

  it('should inject the specified store', () => {
    const component = mount(element);
    return new Promise((resolve) => {
      clock.tick(0);
      resolve();
    }).then(() => {
      component.update();
      expect(component.find('SimpleComponent').first().prop('theState')).toBe(state);
    });
  });

  it('should make the wrapped component an observer', () => {
    const component = mount(element);
    return new Promise((resolve) => {
      clock.tick(0);
      resolve();
    }).then(() => {
      component.update();
      state.message = "updated";
      expect(component.html()).toMatchSnapshot();
    });
  });

});
