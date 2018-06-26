import { loading } from '../../common/components/loading';
import { CountersState } from '../state';

import { Counters as CountersComponent } from '../components/counters';

export const Counters = 
loading<CountersState>('countersState', (countersState) => countersState.loadCounters())(
  CountersComponent
);
