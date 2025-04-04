import React, {Component} from "react";
import './Timer.css';

class Timer extends Component {
  render() {
    const {time} = this.props;

    const _time = new Date(time);

    const hour = _time.getHours();
    const _minutes= _time.getMinutes();
    const _seconds = _time.getSeconds();

    const minutes = _minutes < 10 ? `0${_minutes}` : _minutes;
    const seconds = _seconds < 10 ? `0${_seconds}` : _seconds;

    return (
      <div className="timer">
        {`${hour}:${minutes}:${seconds}`}
      </div>
    );
  }
}

export default Timer;
