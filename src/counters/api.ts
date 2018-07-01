import { debounce } from 'lodash';

export interface ICountersApi {
  loadCounters: () => Promise<number[]>;
  saveCounters: (counters: number[]) => void;
}

export default class CountersApi implements ICountersApi {

  public saveCounters: (counters: number[]) => void;

  constructor() {
    this.saveCounters = debounce(this.doSave, 1000);
  }

  public async loadCounters(): Promise<number[]> {
    const response = await fetch('http://localhost:4000/counters');
    const json = await response.json();
    return [...json.data];
  }

  private doSave(counters: number[]) {
    fetch('http://localhost:4000/counters', {
      body: JSON.stringify({counters}),
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      method: 'post',
    })
    .catch((err) => console.log('failed to save counters: ', err));
  }
}
