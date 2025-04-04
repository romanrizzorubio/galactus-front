import React, {Component} from "react";
import './App.css';
import Panel from "../panel/Panel";
import Progress from "../progress/Progress";
import Timer from "../timer/Timer";
import Api from "../../api/Api";

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

  setData(data) {
    const maquina = (data.maquina * 100) / data.maquinaMax;
    const solucion = (data.solucion * 100) / data.solucionMax;
    const nulificador = (data.nulificador * 100) / data.nulificadorMax;
    const timer = (data.end - Date.now());

    this.setState({
      numPlayers: data.players,
      solucionDone: data.solucionDone,
      timer,
      maquina,
      solucion,
      nulificador,
    });

    if (maquina < 100 && timer > 0 && nulificador > 0) {
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
    const {maquina, solucion, nulificador, timer, solucionDone} = this.state;

    if (maquina >= 100) {
      return (
        <div className="app">
          <h1>¡Fin del juego!</h1>
          <h2>¡Galactus ha devorado el planeta!</h2>
        </div>
      );
    }

    if (timer < 0) {
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
        <h1><Timer time={timer} /></h1>
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
