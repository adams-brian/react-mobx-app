import DevTools from 'mobx-react-devtools';
import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';

import { About } from './components/about';
import { Counters } from './components/counters';
import { Footer } from './components/footer';
import { Nav } from './components/nav';
import { Users } from './components/users';

export class App extends React.Component {
  public render() {
    return (
      <div className="App d-flex flex-column">
        <DevTools />
        <Nav/>
        <div className="content">
          <div className="container">
            <Switch>
              <Redirect exact={true} from="/" to="/counters"/>
              <Route path="/counters" component={Counters}/>
              <Route path="/users" component={Users}/>
              <Route path="/about" component={About}/> */}
            </Switch>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}
