import React, {Component} from "react";
import './Panel.css';
import imgMaquina from '../../img/7a-maquina-galactus.jpg';
import imgSolucion from '../../img/8ma-buscando-solucion.jpg';
import imgNulificador from '../../img/8mb-busca-nulificador-supremo.jpg';

export const PANEL_TYPES = {
  MAQUINA: 'maquina',
  SOLUCION: 'solucion',
  NULIFICADOR: 'nulificador',
};

class Panel extends Component {
  get img() {
    const {type} = this.props;

      if (type === PANEL_TYPES.SOLUCION) {
        return imgSolucion;
      } else if (type === PANEL_TYPES.NULIFICADOR) {
        return imgNulificador;
      } else if (type === PANEL_TYPES.MAQUINA) {
        return imgMaquina;
      }

      return '';
  }

  get imgClassName() {
    const {type} = this.props;

    return `panel ${type}`;
  }

  render() {
    const {type} = this.props;

    return (
      <div className={this.imgClassName}>
        <img src={this.img}/>
        {this.props.children}
      </div>
    );
  }
}

export default Panel;
