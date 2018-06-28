import { shallow } from 'enzyme';
import * as React from 'react';
// import { MemoryRouter } from 'react-router';
import App from './App';

describe("App", () => {
  it('renders without crashing', () => {
    const component = shallow(<App />);
    expect(component).toHaveLength(1);
    // const wrapper = mount(
    //   <MemoryRouter initialEntries={[ '/random' ]}>
    //     <App/>
    //   </MemoryRouter>
    // );
    // expect(wrapper.find(LandingPage)).toHaveLength(0);


    // const div = document.createElement('div');
    // ReactDOM.render(<App />, div);
    // ReactDOM.unmountComponentAtNode(div);
  });
});
