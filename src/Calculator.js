import React from 'react';
import './Calculator.css';

function Button(props) {
  return <button onClick={(e) => props.onClick(props.value)}>{props.value}</button>
}

export default class Calculator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      result: '0'
    }
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick(value) {
    let result = this.state.result;
    
    switch(value) {
      case 'C':
        result = '0';
        break;
      case '+/-':
        if(result !== '0') {
          result = result.startsWith('-') ? result.slice(1) : `-${result}`;
        }
        break;
      case '%':
        break;
      case '/': 
        break;
      case '*':
        break;
      case '+':
        break;
      case '-':
        break;
      case '=':
        break;
      default:
        result = result === '0' ? value : `${result}${value}`;    
    }
    this.setState({result: result});
  }
  
  render() {

    return (
      <div>
        <div className="calculator">
          <div className="result">{this.state.result}</div>
          <div>
            <Button onClick={this.handleClick} value={'C'} />
            <Button onClick={this.handleClick} value={'+/-'} />
            <Button onClick={this.handleClick} value={'%'} />
            <Button onClick={this.handleClick} value={'/'} />
          </div>
          <div>
            <Button onClick={this.handleClick} value={'7'} />
            <Button onClick={this.handleClick} value={'8'} />
            <Button onClick={this.handleClick} value={'9'} />
            <Button onClick={this.handleClick} value={'*'} />
          </div>
          <div>
            <Button onClick={this.handleClick} value={'4'} />
            <Button onClick={this.handleClick} value={'5'} />
            <Button onClick={this.handleClick} value={'6'} />
            <Button onClick={this.handleClick} value={'+'} />
          </div>
          <div>
            <Button onClick={this.handleClick} value={'1'} />
            <Button onClick={this.handleClick} value={'2'} />
            <Button onClick={this.handleClick} value={'3'} />
            <Button onClick={this.handleClick} value={'-'} />
          </div>
          <div>
            <button className="zero">0</button>
            <Button onClick={this.handleClick} value={'.'} />
            <Button onClick={this.handleClick} value={'='} />
          </div>  
        </div>
      </div>
    )
  }
}