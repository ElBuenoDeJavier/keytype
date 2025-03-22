import React from 'react';
import BarraProgreso from './BarraProgreso';
function Contador({tiempoRestante, tiempo2, contador}){
    return(
      <div>
      <div className='flex justify-center'>
      <h2 className="text-indigo-800 text-4xl text-center countdown">
          <span style={{"--value":tiempoRestante} /* as React.CSSProperties */ } aria-live="polite" aria-label={tiempoRestante}>{tiempoRestante}</span>
          <br />
      </h2>
      <span className='text-indigo-800 text-4xl text-center'>s</span>
      </div>
      <BarraProgreso tiempoRestante={tiempoRestante} tiempo2={tiempo2} contador={contador}/>
      </div>
    )  
}
export default Contador;