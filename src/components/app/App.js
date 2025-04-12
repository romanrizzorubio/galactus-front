import React, {Component} from "react";
import './App.css';
import Panel from "../panel/Panel.js";
import Progress from "../progress/Progress.js";
import Api from "../../api/Api.js";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numPlayers: 2,
      solucionDone: false,
      maquina: 50,
      solucion: 50,
      nulificador: 50,
      end: new Date(),
      ended: false,
    }
  }

  componentDidMount() {
    this.load();
  }

  load() {
    Api.get('data')
      .then(data => {
        console.log(data);

        this.setData(data);
      });
  }

  getTime(end) {
    const now = new Date();
    const time = new Date(end);

    if (time.getTime() < now.getTime()) {
      this.setState({
        ...this.state,
        ended: true,
      })
    }

    let hour = time.getHours() - now.getHours();
    let _minutes= time.getMinutes() - now.getMinutes();
    let _seconds = time.getSeconds() - now.getSeconds();
    if (_seconds < 0) {
      _seconds = 60 + _seconds;
      _minutes--;
    }
    if (_minutes < 0) {
      _minutes = 60 + _minutes;
      hour--;
    }

    const minutes = _minutes < 10 ? `0${_minutes}` : _minutes;
    const seconds = _seconds < 10 ? `0${_seconds}` : _seconds;

    return `${hour}:${minutes}:${seconds}`;
  }

  setData(data) {
    const maquina = (data.maquina * 100) / data.maquinaMax;
    const solucion = (data.solucion * 100) / data.solucionMax;
    const nulificador = (data.nulificador * 100) / data.nulificadorMax;
    const timer = this.getTime(data.end);

    this.setState({
      numPlayers: data.players,
      solucionDone: data.solucionDone,
      timer,
      maquina,
      solucion,
      nulificador,
    });

    if (maquina < 100 && !this.state.ended && nulificador > 0) {
      setTimeout(() => {
        this.load();
      }, 1000)
    }
  }

  handleSolucion = () => {
    Api.get('solucion-done')
      .then(data => {
        this.setData(data);
      })
  }

  get classPlan() {
    return this.state.solucionDone ? 'nulificador' : 'solucion';
  }

  render() {
    const {maquina, solucion, nulificador, timer, solucionDone, ended} = this.state;

    if (maquina >= 100) {
      return (
        <div className="app">
          <h1>¡Fin del juego!</h1>
          <h2>¡Galactus ha devorado el planeta!</h2>
        </div>
      );
    }

    if (ended) {
      return (
        <div className="app">
          <h1>¡Fin del juego!</h1>
          <h2>¡Se os acabó el tiempo!</h2>
        </div>
      );
    }

    if (!solucionDone && solucion < 1) {
      return (
        <div className="app">
          <h1>¡Solución encontrada!</h1>
          <button onClick={this.handleSolucion}>Avanzar</button>
        </div>
      );
    }

    if (nulificador < 1) {
      return (
        <div className="app">
          <h1>¡Nulificador encontrado!</h1>
          <h2>Dad la vuelta a la Máquina</h2>
        </div>
      );
    }

    return (
      <div className="app">
        <h1>{timer}</h1>
        <div className="container">
          <Panel type="maquina">
            <Progress perc={maquina} invert/>
          </Panel>
          <Panel type={this.classPlan}>
            <Progress perc={solucionDone ? nulificador : solucion} invert/>
          </Panel>
        </div>
      </div>
    );
  }
}

export default App;
