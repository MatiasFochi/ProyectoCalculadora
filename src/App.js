import './App.css';
import freeCodeCampLogo from './Imagenes/freecodecamp-logo.png';
import Boton from './Componentes/Boton.js';
import Pantalla from './Componentes/Pantalla.js'
import BotonClear from './Componentes/BotonClear.js';
import { useState } from 'react';
import { evaluate } from 'mathjs';

function App() {

  const [input,setInput] = useState('');
  const [esNumero,setEsNumero] = useState(true)
  let ultimoIngresado = '';

  const agregarNumero = val => {
    console.log("valor: "+val);
    setEsNumero(true);
    setInput(input + val);
    ultimoIngresado = val;
    console.log("input: "+input);
  };

  const agregarOperador = val => {
    console.log("valor: "+val);
    if(esNumero){
      setInput(input + val);
      
    console.log("input: "+input);
      ultimoIngresado = val;
    }
    else{
      if(val !== ultimoIngresado){
        let nuevoOperador = input.slice(0,-1);
        nuevoOperador = nuevoOperador + val;
        setInput(nuevoOperador);
        ultimoIngresado = val;
      }
    }
    setEsNumero(false);
    console.log("Ultimo: " +ultimoIngresado);
  }

  const calcularResultado = () => {
    if(input && isNaN(ultimoIngresado)){
      setInput(evaluate(input));
    }
    else{
      alert("Por favor ingrese valores para realizar los calculos.");
    }
  };

  return (
    <div className="App">
      <div className='freecodecamp-logo-contenedor'>
        <img
          src = {freeCodeCampLogo}
          className='freecodecamp-logo'
          alt = 'Logo de freeCodeCamp' />
      </div>
      <div className='contenedor-calculadora'>
        <Pantalla input={input}/>
        <div className='fila'>
          <Boton manejarClic = {agregarNumero}>1</Boton>
          <Boton manejarClic = {agregarNumero}>2</Boton>
          <Boton manejarClic = {agregarNumero}>3</Boton>
          <Boton manejarClic = {agregarOperador}>+</Boton>
        </div>
        <div className='fila'>
          <Boton manejarClic = {agregarNumero}>4</Boton>
          <Boton manejarClic = {agregarNumero}>5</Boton>
          <Boton manejarClic = {agregarNumero}>6</Boton>
          <Boton manejarClic = {agregarOperador}>-</Boton>
        </div>
        <div className='fila'>
          <Boton manejarClic = {agregarNumero}>7</Boton>
          <Boton manejarClic = {agregarNumero}>8</Boton>
          <Boton manejarClic = {agregarNumero}>9</Boton>
          <Boton manejarClic = {agregarOperador}>*</Boton>
        </div>
        <div className='fila'>
          <Boton manejarClic = {calcularResultado}>=</Boton>
          <Boton manejarClic = {agregarNumero}>0</Boton>
          <Boton manejarClic = {agregarOperador}>.</Boton>
          <Boton manejarClic = {agregarOperador}>/</Boton>
        </div>
        <div className='fila'>
          <BotonClear manejarClear={() => setInput('')}>Clear</BotonClear>
        </div>
      </div>
    </div>
  );
}

export default App;
