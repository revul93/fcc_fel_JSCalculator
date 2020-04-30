import React from 'react';
import Button from './Button';
import './App.css';

const NUMBERS = '1234567890';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: '0',
      result: ''
    }

    this.handleNumberButtonClick = this.handleNumberButtonClick.bind(this);
    this.handleOperationButtonClick = this.handleOperationButtonClick.bind(this);
    this.handleDecimalButtonClick = this.handleDecimalButtonClick.bind(this);
    this.handleDisplayButtonClick = this.handleDisplayButtonClick.bind(this);
    this.handleClearButtonClick = this.handleClearButtonClick.bind(this);
  }

  handleNumberButtonClick(e) {
    const eventValue = e.target.value;

    // set input and result to inital if it holds NaN
    //  or if result includes '=' which indecate end of calculation
    if (this.state.input.toString() === NaN.toString() ||
        this.state.result.includes('=')) {
      this.setState({
        input: '',
        result: ''
      })
    }
    // set input to initial if it holds operators
    else if (isNaN(this.state.input)) {
      this.setState({
        input: ''
      })
    }

    // if input in inital state, replace inital state with event value
    if (this.state.input === '0' && eventValue !== '0') {
      this.setState(state => ({
        input: eventValue,
        result: state.result + eventValue
      }))
    }

    // if input isn't in inital state add value to current input state
    else if (this.state.input !== '0') {
      this.setState(state => ({
        input: state.input + eventValue,
        result: state.result + eventValue
      }))
    }
  }

  handleOperationButtonClick(e) {
    const eventValue = e.target.value;

    if (this.state.result.includes('=')) {
      this.setState(state => ({
        result: state.input
      }))
    }
    
    if (!this.state.result.length) {
      if (eventValue === '-') {
        this.setState({
          input: eventValue,
          result: eventValue
        })
      }
      else {
        return;
      }
    }
    else if (this.state.result.length === 1) {
      if (eventValue === '-' && this.state.result[0] !== '-') {
        this.setState(state => ({
          input: eventValue,
          result: state.result + eventValue
        }))
        return;
      }
      else if (eventValue !== '-' && !isNaN(this.state.result[0])) {
        this.setState(state => ({
          input: eventValue,
          result: state.result + eventValue
        }))
        return;
      }
    }
    else {
      if (!isNaN(this.state.result[this.state.result.length - 1])) {
        this.setState(state => ({
          input: eventValue,
          result: state.result + eventValue
        }))
      }
      else if (isNaN(this.state.result[this.state.result.length - 1]) &&
                isNaN(this.state.result[this.state.result.length - 2])) {
        if (eventValue === '-') {
          this.setState(state => ({
            input: eventValue,
            result: state.result.slice(0, state.result.length - 1) + eventValue
          }))
        }
        else {
          this.setState(state => ({
            input: eventValue,
            result: state.result.slice(0, state.result.length - 2) + eventValue
          }))
        }
      }
      else if (eventValue !== '-') {
        this.setState(state => ({
          input: eventValue,
          result: state.result.slice(0, state.result.length - 1) + eventValue
        }))
      }
      else if (eventValue === '-') {
        this.setState(state => ({
          input: eventValue,
          result: state.result + eventValue
        }))
      }
    }
  }

  handleDecimalButtonClick() {
    // check if input doesn't contain a decimal point
    if (!this.state.input.includes('.')) {
      this.setState(state => ({
        input: state.input + '.',
        result: state.result + '.'
      }))
    }
  }

  /* eslint no-eval: 0 */
  handleDisplayButtonClick() {
    let result;
    try {
      result = eval(this.state.result).toString();
    }
    catch {
      this.setState({
        result: NaN,
        input: NaN
      })
    }
    if (result) {
      this.setState(state => ({
        result: state.result + '=' + result,
        input: result
      }))
    }
  }

  handleClearButtonClick() {
    this.setState({
      input: '0',
      result: ''
    })
  }

  render() {
    return (
      <div className="App">
        <div className="display">
          <input id="preview" className="display" type="text"
            readOnly="readOnly" disabled="disabled"
            value={this.state.result}
          />
          <input id="display" className="display"
            readOnly="readOnly" disabled="disabled"
            value={this.state.input}
          />
        </div>

        <div className="grid-container">
          {'+-*/'.split('').map(elem => {
            return (
              <Button key={elem.charCodeAt(0)} value={elem} 
              handleClick={this.handleOperationButtonClick}
              classes="grid-item button" />
            )
          })}

          {NUMBERS.split('').map(elem => {
            return(
              <Button  value={elem} key={elem} 
              handleClick={this.handleNumberButtonClick} 
              classes="grid-items button numbers"/>
            )
          })}

          <Button value={'AC'} classes="grid-items button" 
            handleClick={this.handleClearButtonClick} />
          <Button value={'.'} classes="grid-items button"
            handleClick={this.handleDecimalButtonClick} />
          <Button value="=" classes="grid-items button" 
            handleClick={this.handleDisplayButtonClick} />
        </div>
      </div>
    )
  }
}

export default App;
