import React, {Component} from "react";
import './Init.css';
import Api from "../../api/Api";

class Init extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numPlayers: 0,
      end: 0,
    }
  }

  handlePlayers = e => {
    this.setState({numPlayers: e.target.value});
  }

  handleEnd = e => {
    this.setState({end: e.target.value});
  }

  handleInit = () => {
    const end = new Date();
    const [hours, minutes] = this.state.end.split(':');
    end.setHours(hours);
    end.setMinutes(minutes);
    end.setSeconds(59);

    Api.post('init', {
      players: this.state.numPlayers,
      end: end.getTime(),
    })
      .then(() => {
        window.open('/', '_self');
      })
  }

  render() {
    const {numPlayers, end} = this.state;

    return (
      <div className="init">
        <h1>Galactus</h1>
        <div className="container">
          <label>Jugadores</label>
          <input id="players" type="number" value={numPlayers} onChange={this.handlePlayers} />
          <input id="end" type="time" value={end} onChange={this.handleEnd} />
          <button onClick={this.handleInit}>Iniciar</button>
        </div>
      </div>
    );
  }
}

export default Init;
