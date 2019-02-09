import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import Home from './Home';
import Weather from './Weather';
import Calculator from './Calculator';

class App extends Component {
  render() {
    return (
      <Router>
      <div>
        
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link className="navbar-brand" to="/react-playground">React Playground</Link>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item dropdown d-lg-none">
              <button className="btn nav-link dropdown-toggle" href="#" id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Projects
              </button>
              <div className="dropdown-menu position-absolute" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to="/react-playground/weather">Weather</Link>
                <Link className="dropdown-item" to="/react-playground/calculator">Calculator</Link>
              </div>
            </li>
          </ul>
          
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a href="https://github.com/skray/react-playground" className="nav-link"><i className="fab fa-github"></i></a>
            </li>
          </ul>
        </nav>
        
        <div className="container-fluid">
          <div className="row">
            <div className="col-2 border-right min-vh-100 d-none d-lg-block">
              <ul className="nav flex-column mt-3">
                <li className="nav-item">
                  <Link className="nav-link active text-dark" to="/react-playground/weather">Weather</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active text-dark" to="/react-playground/calculator">Calculator</Link>
                </li>
              </ul>
            </div>
            <div className="col-10">
              <Route path="/react-playground" exact component={Home} />
              <Route path="/react-playground/weather" component={Weather} />
              <Route path="/react-playground/calculator" component={Calculator} />
            </div>
          </div>
        </div>
      </div>
      </Router>
    );
  }
}

export default App;
