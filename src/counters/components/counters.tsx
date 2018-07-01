import * as React from 'react';
import loading from '../../common/components/loading';
import CountersState from '../state';
import Counter from './counter';

export class Counters extends React.Component<{countersState: CountersState}> {
  public render() {
    return (
      <div className="counters-container">
        <h1>Counters</h1>
        <h3>Count: {this.props.countersState.countersLength}</h3>
        <div className="counter-container">
          {this.props.countersState.counters.map((counter, index) => 
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
    this.props.countersState.increment(index);
  private decrement = (index: number) =>
    this.props.countersState.decrement(index);
  private reset = (index: number) =>
    this.props.countersState.reset(index);
  private remove = (index: number) =>
    this.props.countersState.remove(index);
  private addCounter = () =>
    this.props.countersState.addCounter();
}

export default loading<CountersState, {}>('countersState', (countersState) => countersState.loadCounters())(
  Counters
);
