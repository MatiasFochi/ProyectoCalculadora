import './App.css';
import freeCodeCampLogo from './Imagenes/freecodecamp-logo.png';
import Boton from './Componentes/Boton.js';
import Pantalla from './Componentes/Pantalla.js'
import BotonClear from './Componentes/BotonClear.js';
import { useState, useEffect, useCallback, useRef } from 'react';
import { evaluate } from 'mathjs';

function App() {

  const [input,setInput] = useState('');
  const ultimoIngresado = useRef('');
  const [hayNumeros,setHayNumeros] = useState(false);

  const agregarNumero = useCallback((val) => {
    if(!hayNumeros){
      setHayNumeros(true);
    }
    setInput(input + val);
    ultimoIngresado.current = val;
  }, [hayNumeros, input]);

  const agregarOperador = useCallback((val) => {
    if(input){
      if(isNaN(input.slice(-1))){
        let nuevoOperador = input.slice(0, -1);
        setInput(nuevoOperador+val);
      }
      else{
        setInput(input+val);
      }
    }
    else{
      setInput(input+val);
    }
    ultimoIngresado.current = val;
  }, [input]);

  const calcularResultado = useCallback(() => {
    if(input && !isNaN(input.slice(-1))){
      try {
        setInput(''+evaluate(input));
        ultimoIngresado.current = '=';
      } catch (error) {
        alert('La expresión ingresada no es válida.');
        setInput('');
      }
    }
    else{
      alert('El cálculo no puede finalizar con un operador o punto.');
    }
  },[input]);

  const reiniciar = () => {
    setInput('');
    setHayNumeros(false);
  };

  useEffect(() => {
    const manejarTecla = (event) => {
      switch(event.key) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '0':
          agregarNumero(event.key);
          break;
        case '+':
        case '-':
        case '*':
        case '/':
        case '.':
          agregarOperador(event.key);
          break;
        case '=':
        case 'Enter':
          calcularResultado();
          break;
        default:
          break;
      }
    };

    // Agrega el controlador de eventos cuando el componente se monta
    window.addEventListener('keydown', manejarTecla);

    // Limpia el controlador de eventos cuando el componente se desmonta
    return () => {
      window.removeEventListener('keydown', manejarTecla);
    };
  }, [agregarNumero, agregarOperador, calcularResultado]);


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
          <BotonClear manejarClear={reiniciar}>Clear</BotonClear>
        </div>
      </div>
    </div>
  );
}

export default App;


/*
  const [input,setInput] = useState('');
  let ultimoIngresado = '';
  const [hayNumeros,setHayNumeros] = useState(false);

  useEffect(() => {
    const manejarTecla = (event) => {
      switch(event.key) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '0':
          agregarNumero(event.key);
          break;
        case '+':
        case '-':
        case '*':
        case '/':
        case '.':
          agregarOperador(event.key);
          break;
        case '=':
        case 'Enter':
          calcularResultado();
          break;
        default:
          break;
      }
    };

    // Agrega el controlador de eventos cuando el componente se monta
    window.addEventListener('keydown', manejarTecla);

    // Limpia el controlador de eventos cuando el componente se desmonta
    return () => {
      window.removeEventListener('keydown', manejarTecla);
    };
  }, []);

  const agregarNumero = useCallback( (val) => {
    if(!hayNumeros){
      setHayNumeros(true);
    }
    setInput(input + val);
    ultimoIngresado = val;
    }, [hayNumeros, input, ultimoIngresado]);
  
  const agregarOperador = useCallback((val) => {
    if(input){
      if(isNaN(input.slice(-1))){
        let nuevoOperador = input.slice(0, -1);
        setInput(nuevoOperador+val);
      }
      else{
        setInput(input+val);
      }
    }
    else{
      setInput(input+val);
    }
    ultimoIngresado = val;
  }, [input]);
  
  const calcularResultado = useCallback(() => {
    if(input && !isNaN(input.slice(-1))){
      try {
        setInput(''+evaluate(input));
        ultimoIngresado = '=';
      } catch (error) {
        alert('La expresión ingresada no es válida.');
        setInput('');
      }
    }
    else{
      alert('El calculo no puede finalizar con un operador o punto.');
    }
  },[input, ultimoIngresado]);
  

  const reiniciar = () => {
    setInput('');
    setHayNumeros(false);
  };

*/