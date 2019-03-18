import React from 'react';
import { createBoxes, solve } from './circleBotSolver';

function Box(props) {
  let classes = 'box';

  if(props.props.isRobot) {
    classes += ' robot';
  } else if(props.props.isCenter) {
    classes += ' center';
  } else if(props.props.visitedEven) {
    classes += ' visited-even';
  } else if(props.props.visitedOdd) {
    classes += ' visited-odd';
  }
  return (
    <div className={classes}></div>
  );
}

export default class CircleBot extends React.Component {

  constructor(props) {
    super(props);
    let boxes = createBoxes();

    this.state = {
      boxes,
      command: '',
      returnsToOrigin: null
    };

    this.handleCommandChange = this.handleCommandChange.bind(this);
    this.handleGoClicked = this.handleGoClicked.bind(this);
  }

  handleCommandChange(evt) {
    let command = evt.target.value;

    if(command) {
      command = command.toUpperCase().replace(/[^GLR]/g, '').slice(0,25);
    }

    let {returnsToOrigin, boxStates} = solve(command);

    this.setState({
      command,
      boxes: boxStates[boxStates.length - 1],
      returnsToOrigin
    });
  }

  handleGoClicked(evt) {

    evt.preventDefault();

    let command = this.state.command;
    let {returnsToOrigin, boxStates} = solve(command);

    this.setState({
      boxes: boxStates[0],
      returnsToOrigin
    });

    let _this = this;

    function move(step) {

      _this.setState({boxes: boxStates[step]});

      if(step < boxStates.length -1) {
        setTimeout(() => move(++step), 175);
      }

    }

    move(0);
  }


  render () {
    return (
      <div>
        <h1>Circle Bot</h1>
        <p>
          Enter a string of commands (R = turn right, L = turn left, G = move forward one). See if the commands, when run repeatedly, will ever return the robot back to its starting point.
          For example, 'GG' will not return to origin, while 'GGR' will.
        </p>
        <form className="form-inline my-2" onSubmit={this.handleGoPressed}>
          <input className="command-input form-control flex-grow-1 mr-2 mb-2 mb-lg-0" placeholder="Enter up to 25 commands" onChange={this.handleCommandChange} value={this.state.command}/>
          <button className="btn btn-info form-control mr-2" onClick={this.handleGoClicked} disabled={!this.state.command.length}>See Run</button>
          <span>Returns to origin: {this.state.returnsToOrigin ? 'True' : 'False'}</span>
        </form>
        <div className="mb-2">
          <small id="passwordHelpBlock" className="form-text text-muted">

          </small>
        </div>
        <div>
          {
            this.state.boxes.map((row, rowIndex) => (
              <div className="box-row" key={rowIndex}>
                {row.map((box, boxIndex) => <Box key={boxIndex} props={box}/>)}
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}