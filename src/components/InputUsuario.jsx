import React from 'react';
// Para entrada de usuario
function InputUsuario({entradaUsuario, handleInputChange, palabras}){
    const entradaCaracteres = entradaUsuario.split('');
    const palabrasCaracteres = palabras.split('');
  
    return(
      <span className='absolute inset-0'>
        <input type="text" value={entradaUsuario} onChange={handleInputChange} className="opacity-0 absolute inset-0" autoFocus/>
        
        {entradaCaracteres.map((caracter, clave) => {
          // me comprueba si el caracter que escribo es igual al de palabras
          const correcto = palabrasCaracteres[clave] == caracter;
          return (
            // le pasa a Caracter el caracter y si es correcto o no
            <Caracter caracter={palabrasCaracteres[clave]} correcto={correcto}/>
          )
        })}
        <Cursor/>
  
      </span>
    )
  }
//Función que me imprime el caracter
function Caracter({caracter, correcto}){
    return(
      //Auí muestro el caracter y si es correcto pues se pone en blanco y si no en rojo con fondo rojo
      // si tiene un espacio en blanco y no es correcto se pone un guón bajo para que se vea el error
      //utilizo un span con un nbsp para que se vea el espacio en blanco
      
      <span className={`leading-relaxed break-all ${correcto ? 'text-white' : 'text-red-600'}`}>
        {caracter == " " && !correcto ? <span className='underline'>&nbsp;</span> : caracter}</span>
    )
}

function Cursor(){
    return(
      <span className='inline-block animate-pulse bg-indigo-800 w-0.5 h-7'></span>
    )
}
export default InputUsuario;