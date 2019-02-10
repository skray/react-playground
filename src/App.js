import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import Home from './Home';
import Weather from './Weather';
import Calculator from './Calculator';
import DropdownButton from 'react-bootstrap/DropdownButton';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      activeLink: null
    };
  }
  
  handleLinkClick(linkName) {
    this.setState({activeLink: linkName});
  }
  
  render() {
    return (
      <Router>
      <div>
        
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link className="navbar-brand" onClick={() => this.handleLinkClick()} to="/react-playground">React Playground</Link>
          <div className="navbar-nav mr-auto">
            <DropdownButton id="dropdown-basic-button" title="Projects" variant='dark' className="nav-link btn-dark d-lg-none">
              <Link className="dropdown-item" onClick={() => this.handleLinkClick('weather')} to="/react-playground/weather">Weather</Link>
              <Link className="dropdown-item" onClick={() => this.handleLinkClick('calculator')} to="/react-playground/calculator">Calculator</Link>
            </DropdownButton>
          </div>
          
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a href="https://github.com/skray/react-playground" className="nav-link">
                <i className="fab fa-github fa-lg"></i>
              </a>
            </li>
          </ul>
        </nav>
        
        <div className="container-fluid p-0">
          <div className="row  no-gutters">
            <div className="col-2 border-right min-vh-100 d-none d-lg-block">
              <ul className="nav flex-column mt-3 list-group list-group-flush">
                <li className="nav-item">
                  <Link className={`list-group-item list-group-item-action ${this.state.activeLink === 'weather' ? 'active' : ''}`} onClick={() => this.handleLinkClick('weather')} to="/react-playground/weather">Weather</Link>
                </li>
                <li className="nav-item">
                  <Link className={`list-group-item list-group-item-action ${this.state.activeLink === 'calculator' ? 'active' : ''}`} onClick={() => this.handleLinkClick('calculator')} to="/react-playground/calculator">Calculator</Link>
                </li>
              </ul>
            </div>
            <div className="col col-lg-10 p-3">
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
