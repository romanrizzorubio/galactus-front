import React, {Component} from "react";
import './Form.css';

class Form extends Component {

  addHandler(value) {
    const {onChange} = this.props;

    return (e) => {
      e.preventDefault();
      onChange(value);
    }
  }

  render() {
    return (
      <div className="form">
        <div className="negativos">
          <a className="button" href="#" onClick={this.addHandler(-10)}>-10</a>
          <a className="button" href="#" onClick={this.addHandler(-5)}>-5</a>
          <a className="button" href="#" onClick={this.addHandler(-3)}>-3</a>
          <a className="button" href="#" onClick={this.addHandler(-1)}>-1</a>
        </div>
        <div className="positivos">
          <a className="button" href="#" onClick={this.addHandler(10)}>+10</a>
          <a className="button" href="#" onClick={this.addHandler(5)}>+5</a>
          <a className="button" href="#" onClick={this.addHandler(3)}>+3</a>
          <a className="button" href="#" onClick={this.addHandler(1)}>+1</a>
        </div>
      </div>
    );
  }
}

export default Form;
