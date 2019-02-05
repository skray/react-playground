import React from 'react';
import './Calculator.css';

function Button(props) {
  return <button id={`button${props.value}`} onClick={(e) => props.onClick(props.value)}>{props.value}</button>
}

export default class Calculator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      displayValue: '0',
      leftOperand: null,
      operator: null,
      shouldClearDisplay: true
    }
    this.handleNumber = this.handleNumber.bind(this);
    this.handleOperator = this.handleOperator.bind(this);
    this.handleEquals = this.handleEquals.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleSignChange = this.handleSignChange.bind(this);
    this.handlePercentage = this.handlePercentage.bind(this);
  }
  
  handleNumber(value) {
    let currentDisplayValue = this.state.displayValue;
    let newDisplayValue;
    
    if(this.state.shouldClearDisplay) {
      newDisplayValue = value;
    } else {
      newDisplayValue = `${currentDisplayValue}${value}`; 
    }
    
    this.setState({
      displayValue: newDisplayValue,
      shouldClearDisplay: false
    });
  }
  
  handleOperator(value) {
    this.setState({
      leftOperand: parseFloat(this.state.displayValue),
      operator: value,
      shouldClearDisplay: true
    });
  }
  
  handleClear() {
    this.setState({
      leftOperand: null,
      operator: null,
      displayValue: '0',
      shouldClearDisplay: true
    });
  }
  
  handleSignChange() {
    let currentDisplayValue = this.state.displayValue;
    let newDisplayValue = currentDisplayValue;

    if(currentDisplayValue.startsWith('-')) {
      newDisplayValue = currentDisplayValue.slice(1);
    } else if (currentDisplayValue !== '0') {
      newDisplayValue = `-${currentDisplayValue}`;
    }

    this.setState({
      displayValue: newDisplayValue,
      leftOperand: -1 * this.state.leftOperand
    }); 
  }
  
  handlePercentage() {
    this.setState({
      displayValue: parseFloat(this.state.displayValue) / 100,
      leftOperand: parseFloat(this.state.displayValue) / 100
    });
  }
  
  handleEquals() {
    let operator = this.state.operator;
    let leftOperand = this.state.leftOperand;
    let rightOperand = parseFloat(this.state.displayValue);
    let result;
    
    if (operator === '+') {
      result = leftOperand + rightOperand;
    } else if (operator === '-') {
      result = leftOperand - rightOperand;
    } else if (operator === '*') {
      result = leftOperand * rightOperand;
    } else if (operator === '/') {
      result = leftOperand / rightOperand;
    }
    
    this.setState({
      displayValue: result,
      leftOperand: result,
      shouldClearDisplay: true
    });
  }
  
  render() {

    return (
      <div>
        <div className="calculator">
          <div className="displayValue">{this.state.displayValue}</div>
          <div>
            <Button onClick={this.handleClear} value={'C'} />
            <Button onClick={this.handleSignChange} value={'+/-'} />
            <Button onClick={this.handlePercentage} value={'%'} />
            <Button onClick={this.handleOperator} value={'/'} />
          </div>
          <div>
            <Button onClick={this.handleNumber} value={'7'} />
            <Button onClick={this.handleNumber} value={'8'} />
            <Button onClick={this.handleNumber} value={'9'} />
            <Button onClick={this.handleOperator} value={'*'} />
          </div>
          <div>
            <Button onClick={this.handleNumber} value={'4'} />
            <Button onClick={this.handleNumber} value={'5'} />
            <Button onClick={this.handleNumber} value={'6'} />
            <Button onClick={this.handleOperator} value={'+'} />
          </div>
          <div>
            <Button onClick={this.handleNumber} value={'1'} />
            <Button onClick={this.handleNumber} value={'2'} />
            <Button onClick={this.handleNumber} value={'3'} />
            <Button onClick={this.handleOperator} value={'-'} />
          </div>
          <div>
            <Button onClick={this.handleNumber} className="zero" value={'0'} />
            <Button onClick={this.handleNumber} value={'.'} />
            <Button onClick={this.handleEquals} value={'='} />
          </div>  
        </div>
      </div>
    )
  }
}