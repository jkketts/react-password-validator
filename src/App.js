import React, { Component } from 'react';
import logo from './logo.svg';
import './app.css';

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {progress: 0,
                    validLen: false,
                    validSpec: false,
                    validNum: false,
                    pword: ''};
      
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }   

  updateProgress = () => {
      this.setState((prevState) => ({progress: (prevState.validLen + prevState.validNum + prevState.validSpec) * 33.333}));
  }
  
  checkSpecChar = () => {
      const regex = /^[!@#\$%\^\&*\)\(+=._-]/g;
      let pword = [].slice.call(this.state.pword);
      let mappedBools = pword.map(chr => {return chr.match(regex)});
      let isTrue = mappedBools.some(function(el) {return el !== null});
      
      isTrue ? this.setState({validSpec: true}) : this.setState({validSpec: false});
  }
  
  checkNumber = () => {
      const regex = /^[0-9]/g;
      let pword = [].slice.call(this.state.pword);
      let mappedBools = pword.map(chr => {return chr.match(regex)});
      let isTrue = mappedBools.some(function(el) {return el !== null});
      
      isTrue ? this.setState({validNum: true}) : this.setState({validNum: false});
  }
    
  checkLength = () => {
      this.state.pword.length > 5 ? this.setState(() => ({validLen:true})) : this.setState(() => ({validLen:false}));
  }
    
  handleChange = (e) => {this.setState({pword: e.target.value}, () => {
    this.checkLength();
    this.checkNumber();
    this.checkSpecChar();
    this.updateProgress();
  })};

  handleSubmit = (e) => {
      console.log(this.state.pword);
      e.preventDefault();
  }
  
  render() {
    return (
        <div>
        <form onSubmit={this.handleSubmit}>
            <label>Password</label>
            <input type="text" value={this.state.pword} onChange={this.handleChange} />
        <input type="submit" value="Submit" />
        </form>
        <progress value={this.state.progress} max="100"></progress>
        </div>
    );
  }
}

export default App;