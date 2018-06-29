import { observe } from 'mobx';
import * as sinon from 'sinon';

import CountersState from './state';

const counters = [5,1,4,2,3];

describe('CountersState', () => {
  
  let loadCounters: sinon.SinonSpy;
  let saveCounters: sinon.SinonSpy;
  let countersState: CountersState;

  beforeEach(() => {
    loadCounters = sinon.fake.resolves(counters);
    saveCounters = sinon.fake();
    countersState = new CountersState({
      loadCounters,
      saveCounters
    });
  });

  it('loads counters', () => {
    expect(countersState.counters).toEqual([]);
    expect(loadCounters.called).toBe(false);
    return countersState.loadCounters().then(data => {
      expect(loadCounters.calledOnce).toBe(true);
      expect(countersState.counters).toEqual(counters);
    });
  });

  it('computes the length', () => {
    expect(countersState.countersLength).toBe(0);
    return countersState.loadCounters().then(data => {
      expect(countersState.countersLength).toBe(5);
    });
  });

  describe('once loaded', () => {

    beforeEach(() => {
      return countersState.loadCounters();
    });

    it('increments', () => {
      const index = 2;
      expect(countersState.counters).toEqual(counters);
      expect(saveCounters.called).toBe(false);
      countersState.increment(index);
      expect(countersState.counters).toEqual(
        [
          ...counters.slice(0, index),
          counters[index] + 1,
          ...counters.slice(index + 1)
        ]);
      expect(saveCounters.calledOnce).toBe(true);
    });

    it('decrements', () => {
      const index = 3;
      expect(countersState.counters).toEqual(counters);
      expect(saveCounters.called).toBe(false);
      countersState.decrement(index);
      expect(countersState.counters).toEqual(
        [
          ...counters.slice(0, index),
          counters[index] - 1,
          ...counters.slice(index + 1)
        ]);
      expect(saveCounters.calledOnce).toBe(true);
    });

    it('resets', () => {
      const index = 0;
      expect(countersState.counters).toEqual(counters);
      expect(saveCounters.called).toBe(false);
      countersState.reset(index);
      expect(countersState.counters).toEqual(
        [
          ...counters.slice(0, index),
          0,
          ...counters.slice(index + 1)
        ]);
      expect(saveCounters.calledOnce).toBe(true);
    });

    it('removes', () => {
      const index = 1;
      expect(countersState.counters).toEqual(counters);
      expect(saveCounters.called).toBe(false);
      countersState.remove(index);
      expect(countersState.counters).toEqual(
        [
          ...counters.slice(0, index),
          ...counters.slice(index + 1)
        ]);
      expect(saveCounters.calledOnce).toBe(true);
    });

    it('adds', () => {
      expect(countersState.counters).toEqual(counters);
      expect(saveCounters.called).toBe(false);
      countersState.addCounter();
      expect(countersState.counters).toEqual([...counters, 0]);
      expect(saveCounters.calledOnce).toBe(true);
    });

    it('makes counters observable', () => {
      let changeDetected = false;
      const disposer = observe(countersState.counters, () => {
        changeDetected = true;
      });
      expect(changeDetected).toBe(false);
      countersState.increment(1);
      expect(changeDetected).toBe(true);
      disposer();
    });

    it('makes countersLength observable', () => {
      let changeDetected = false;
      const disposer = observe(countersState, 'countersLength', () => {
        changeDetected = true;
      })
      expect(changeDetected).toBe(false);
      countersState.addCounter();
      expect(changeDetected).toBe(true);
      disposer();
    });
  });
});
