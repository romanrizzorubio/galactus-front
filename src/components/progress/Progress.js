import React, {Component} from "react";
import './Progress.css';

class Progress extends Component {
  get progressClassName() {
    const {perc, invert} = this.props;

    if (invert) {
      if (perc < 33) {
        return 'high';
      } else if (perc < 66) {
        return 'medium';
      }
    } else {
      if (perc > 66) {
        return 'high';
      } else if (perc > 33) {
        return 'medium';
      }
    }

    return '';
  }

  render() {
    const {perc} = this.props;

    const className = `progress-bar ${this.progressClassName}`;

    return (
      <div className="progress">
        <div
          className={className}
          style={{width: `${perc}%`}}
        ></div>
      </div>
    );
  }
}

export default Progress;
