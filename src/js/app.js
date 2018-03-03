import React from 'react';
import ReactDOM from 'react-dom';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import LoginRegister from './components/container/LoginRegister';
import Home from './components/container/Home';
import { Provider } from 'react-redux';
import store from 'REDUX/store';

class App extends React.Component {
  render() {
    return (
      // 为了使用redux, 必须在最顶层使用Provider进行包裹
      <Provider store={store}>
        {/*同上, 为了使用react-router, 使用BrowserRouter进行包裹*/}
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/login" component={LoginRegister}/>
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));