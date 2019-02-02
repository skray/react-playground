import React from 'react';

function Day(props) {
  return (
    <div className="card mb-1">
      <div className="card-body">
        <h5 className="card-title">{props.period.name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">
          <span>{props.period.temperature}°{props.period.temperatureUnit}</span> <span>{props.period.shortForecast}</span>
        </h6>
        <p className="card-text">{props.period.detailedForecast}</p>
      </div>
    </div>
  )
}

export default class Weather extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      forecast: null,
      error: null
    }
    this.loadWeather()
  }

  loadWeather() {
    fetch('https://api.weather.gov/gridpoints/IND/57,68/forecast')
      .then(response => {
        if(response.ok) {
          return response.json()
        } else {
          return Promise.reject(response);
        }
      })
      .then(weatherData => this.setState({forecast: weatherData.properties}))
      .catch(error => this.setState({error: 'Error loading weather data'}));
  }

  render() {

    let content;

    if(this.state.error) {
      content = <div>{this.state.error}</div>
    } else if(!this.state.forecast) {
      content = <div>Loading</div>
    } else {
      content = (
        <div>
          { this.state.forecast.periods.map(period => {
            return <Day period={period} key={period.number}/>
          }) }
        </div>
      );
    }

    return (
      <div>
        <h1 className="m-3">Weather Forecast for Indianapolis, IN</h1>
        { content }
      </div>
    )
  }
}