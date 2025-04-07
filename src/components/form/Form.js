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
          <button className="button" href="#" onClick={this.addHandler(-10)}>-10</button>
          <button className="button" href="#" onClick={this.addHandler(-5)}>-5</button>
          <button className="button" href="#" onClick={this.addHandler(-3)}>-3</button>
          <button className="button" href="#" onClick={this.addHandler(-1)}>-1</button>
        </div>
        <div className="positivos">
          <button className="button" href="#" onClick={this.addHandler(10)}>+10</button>
          <button className="button" href="#" onClick={this.addHandler(5)}>+5</button>
          <button className="button" href="#" onClick={this.addHandler(3)}>+3</button>
          <button className="button" href="#" onClick={this.addHandler(1)}>+1</button>
        </div>
      </div>
    );
  }
}

export default Form;
