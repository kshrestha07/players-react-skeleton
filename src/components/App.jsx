import logo from './logo.svg';
import React, { Component } from 'react';
import '../index'

import {
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';

import Login from '../components/Login/Login';
import Players from '../components/Players/Players';
import Register from '../components/Register/Register';
import Roster from '../components/Roster/Roster';
import Home from '../components/Home/Home';
import Footer from '../BasicComponent/Footer';
import Service from '../Service/Service';
import CardHeader from '@material-ui/core/CardHeader';

class App extends Component {

  constructor(props) {
    super(props);
    this.api = new Service();
  }

  logout = () => {
    this.api.removeCookie("token");
    this.props.history.push('/');
  }

  navigateToHome = (isValidSession) => {
    if (isValidSession) {
      this.props.history.push('/roster');
    } else {
      this.props.history.push('/');
    }
  }

  render() {
    let token = this.api.getCookie("token");
    let isValidSession = false;
    if (token !== null && token !== undefined) {
      isValidSession = true;
    }

    return (
      <div className="App">
        <div className="header-blog">

          <a className="logo-link" href="/">
            <img src={logo} className="App-logo" alt="logo" />
          </a>
          <div className="welcometext">
            <h3> Welcome to Your Dream Football Games. </h3>
          </div>
          <div className="right">
            {
              isValidSession &&
              <div>
                <Link to="/roster">Home</Link>
                <Link to="/player/new">Create New player</Link>
                <Link to="/" onClick={this.logout}>Logout</Link>
              </div>
            }
          </div>

        </div>

        <div className="App-intro">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/roster" component={Roster} />
            <Route path="/player/new" component={Players} />
            <Redirect to="/" />
          </Switch>
        </div>
        <div>
          <Footer></Footer>
        </div>
      </div>
    );
  }
}

export default App;
