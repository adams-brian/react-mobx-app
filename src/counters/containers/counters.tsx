import { loading } from '../../common/components/loading';
import { AppState } from '../../store';

import { Counters as CountersComponent } from '../components/counters';

export const Counters = 
loading<AppState>('appState', (appState) => appState.loadCounters())(
  CountersComponent
);
