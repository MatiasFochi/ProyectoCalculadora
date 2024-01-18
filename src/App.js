import './App.css';
import Boton from './Componentes/Boton.js';
import Pantalla from './Componentes/Pantalla.js'
import BotonClear from './Componentes/BotonClear.js';
import { useState, useEffect, useCallback, useRef } from 'react';
import { evaluate } from 'mathjs';
import LogoMF from './Imagenes/LogoPersonal.png';

function App() {

  const [input,setInput] = useState('');
  const ultimoIngresado = useRef('');
  const [hayNumeros,setHayNumeros] = useState(false);
  const [modoClaro, setModoClaro] = useState(true);

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
      alert('La expresión ingresada no es válida.');
    }
  },[input]);

  const borrar = useCallback(() => {
    if(input){
      setInput(input.slice(0, -1));
      ultimoIngresado.current = input.slice(-1);
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
        case 'Backspace':
          borrar();
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
  }, [agregarNumero, agregarOperador, borrar, calcularResultado]);

  const cambiarModo = () => {
    (modoClaro) ? setModoClaro(false) : setModoClaro(true);
  };

  return (
    <div className={(modoClaro) ? "App" : "App darkMode"}>
      <nav className="navbar contenedor-barra">
        <div className="container-fluid">
          <div style={{width: 110 +"px"}}>
            <a className='Contenedor-logo' href='https://www.linkedin.com/in/matias-fochi/' target='_blank' rel='noreferrer' >
              <img className='logo' alt='Logo MF' src={LogoMF} />
            </a>
          </div>
          <div style={{width: 110 +"px"}}>
            <a href='nonrefferer' className="navbar-brand" disabled>Calculadora</a>
          </div>
          <div style={{width: 110 +"px"}}>
            <button className="btn btn-outline-custom" type="submit" onClick={cambiarModo}>{(modoClaro) ? "Modo Claro" : "Modo Noche"}</button>
          </div>
        </div>
      </nav>
      <div className='contenedor-calculadora'>
        <Pantalla input={input}/>
        <div className='fila'>
          <BotonClear manejarClear={reiniciar}>Clear</BotonClear>
          <button className='btn btn-borrar' onClick={borrar} >
            <i className='bi bi-backspace-fill'></i>
          </button>
        </div>        
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
      </div>
      <div className='footer'>
        {"by "}
        <a href='https://www.linkedin.com/in/matias-fochi/' target='_blank' rel='noreferrer' className='texto-footer' >MatiasFochi</a>
      </div>
    </div>
  );
}

export default App;