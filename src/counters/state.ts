import { action, computed, IObservableArray, observable } from 'mobx';

import { ICountersApi } from './api';

export default class CountersState {
  public counters: IObservableArray<number> = observable.array([]);

  @computed get countersLength() {
    return this.counters.length;
  }

  constructor(private api: ICountersApi) { }

  @action public increment(index: number) {
    this.counters[index]++;
    this.api.saveCounters(this.counters);
  }
  @action public decrement(index: number) {
    this.counters[index]--;
    this.api.saveCounters(this.counters);
  }
  @action public reset(index: number) {
    this.counters[index] = 0;
    this.api.saveCounters(this.counters);
  }
  @action public remove(index: number) {
    this.counters.splice(index, 1);
    this.api.saveCounters(this.counters);
  }
  @action public addCounter() {
    this.counters.push(0);
    this.api.saveCounters(this.counters);
  }

  @action public async loadCounters(): Promise<void> {
    this.counters.replace(await this.api.loadCounters());
  }
}
