import { inject, observer } from 'mobx-react';
import * as React from 'react';

interface IState {
  error: boolean;
  loaded: boolean;
  message: string;
  timeoutFired: boolean;
}

export default <TState extends {}>(store: string, load: (state: TState) => Promise<void>) =>
  <TProps extends {}>(Component: React.ComponentType<TProps>) => {

    const ObserverComponent = observer(Component);

    return inject(store)(
      class extends React.Component<TProps, IState> {
        public static displayName = `loading(${Component.displayName || Component.name})`;
        private timeout: NodeJS.Timer;

        constructor(props: TProps) {
            super(props);
            this.state = {
                error: false,
                loaded: false,
                message: "",
                timeoutFired: false
            };
        }

        public componentDidMount() {
          this.timeout = setTimeout(() => this.setState({timeoutFired: true}), 500);
          load(this.props[store])
            .then(() => this.setState({loaded: true}))
            .catch((err) => this.setState({error: true, message: err.message}));
        }

        public componentWillUnmount() {
          clearTimeout(this.timeout);
        }

        public render() {
          if (this.state.loaded) {
            return (
              <ObserverComponent {...this.props} />
            );
          }
          else if (this.state.error) {
            return (
              <div>Error {this.state.message}</div>
            )
          }
          else if (this.state.timeoutFired) {
            return (
              <div>Loading...</div>
            )
          }
          else {
            return null;
          }
        }
      }
    );
  }
