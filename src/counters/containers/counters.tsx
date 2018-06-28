import loading from '../../common/components/loading';
import CountersState from '../state';

import Counters from '../components/counters';

export default loading<CountersState>('countersState', (countersState) => countersState.loadCounters())(
  Counters
);
