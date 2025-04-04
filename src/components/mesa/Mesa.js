import React, {Component} from "react";
import './Mesa.css';
import Panel from "../panel/Panel";
import Form from "../form/Form";
import Api from "../../api/Api";

class Mesa extends Component {
  constructor(props) {
    super(props);

    this.state = {
      solucionDone: false,
    }
  }

  componentDidMount() {
    this.load();
  }

  load() {
    Api.get('data')
      .then(data => {
        console.log(data);

        this.setState({
          solucionDone: data.solucionDone,
        });
      });
  }

  handleMaquina = value => {
    Api.post('maquina', {
      maquina: value,
    });
  }

  handlePlan = value => {
    const {solucionDone} = this.state;

    if (solucionDone)  {
      Api.post('nulificador', {
        nulificador: value,
      });
    } else {
      Api.post('solucion', {
        solucion: value,
      });
    }
  }

  get classPlan() {
    return this.state.solucionDone ? 'nulificador' : 'solucion';
  }

  render() {
    return (
      <div className="mesa">
        <h1>Galactus</h1>
        <div className="container">
          <Panel type="maquina">
            <Form onChange={this.handleMaquina} />
          </Panel>
          <Panel type={this.classPlan}>
            <Form onChange={this.handlePlan} />
          </Panel>
        </div>
      </div>
    );
  }
}

export default Mesa;
