import * as fetchMock from 'fetch-mock';
import * as sinon from 'sinon';

import CountersApi from './api';

const counters = [5,1,4,2,3];

describe('CountersApi', () => {
  
  let countersApi: CountersApi;

  beforeEach(() => {
    countersApi = new CountersApi();
  });

  afterEach(() => {
    fetchMock.restore();
  });

  it('loads counters', () => {
    fetchMock.getOnce('http://localhost:4000/counters', { data: counters });
    return countersApi.loadCounters().then(data => {
      expect(data).toEqual(counters);
      expect(fetchMock.done()).toBe(true);
    });
  });

  it('saves counters users on a 1 second debounce', () => {
    const clock = sinon.useFakeTimers();
    const thePost = fetchMock.postOnce(
      (url, opts: RequestInit) =>
        url === 'http://localhost:4000/counters' &&
        opts.body === JSON.stringify({counters})
      , 200);
    countersApi.saveCounters(counters);
    expect(thePost.called()).toBe(false);
    clock.tick(500);
    countersApi.saveCounters(counters);
    expect(thePost.called()).toBe(false);
    clock.tick(500);
    expect(thePost.called()).toBe(false);
    clock.tick(500);
    expect(fetchMock.done()).toBe(true);
    clock.restore();
  });
  
});
