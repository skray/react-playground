import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import Home from './Home';
import Weather from './Weather';


class App extends Component {
  render() {
    return (
      <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link className="navbar-brand" to="/">React Playground</Link>
        </nav>
        <div className="container-fluid">
          <div className="row">
            <div className="col-2 bg-light min-vh-100">
              <ul className="nav flex-column mt-3">
                <li className="nav-item">
                  <Link className="nav-link active text-dark" to="/weather">Weather</Link>
                </li>
              </ul>
            </div>
            <div className="col-10">
              <Route path="/" exact component={Home} />
              <Route path="/weather" component={Weather} />
            </div>
          </div>
        </div>
      </div>
      </Router>
    );
  }
}

export default App;
