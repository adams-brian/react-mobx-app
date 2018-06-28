import { action, computed, observable } from 'mobx';

import { ICountersApi } from './api';

export default class CountersState {
  @observable public counters: number[] = [];

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
    this.counters = [];
    this.counters = await this.api.loadCounters();
  }
}
