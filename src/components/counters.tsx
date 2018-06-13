import * as React from 'react';
import { AppState } from '../store';
import { Counter } from './counter';
import { loading } from './loading';

export const Counters = 
loading<AppState>('appState', (appState) => appState.loadCounters())(
class extends React.Component<{appState: AppState}> {
  public render() {
    return (
      <div className="counters-container">
        <h1>Counters</h1>
        <h3>Count: {this.props.appState.countersLength}</h3>
        <div className="counter-container">
          {this.props.appState.counters.map((counter, index) => 
            (<Counter 
              key={index} /* not ideal, but it works in this case */
              index={index}
              counter={counter}
              increment={this.increment}
              decrement={this.decrement}
              reset={this.reset}
              remove={this.remove}
            />))}
          <div className="add-counter rounded" onClick={this.addCounter}>
            <span className="fa fa-plus" />
          </div>
        </div>
      </div>
    );
  }
  private increment = (index: number) =>
    this.props.appState.increment(index);
  private decrement = (index: number) =>
    this.props.appState.decrement(index);
  private reset = (index: number) =>
    this.props.appState.reset(index);
  private remove = (index: number) =>
    this.props.appState.remove(index);
  private addCounter = () =>
    this.props.appState.addCounter();
}
);