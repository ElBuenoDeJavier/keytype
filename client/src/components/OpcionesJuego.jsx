import React from "react";
export default function OpcionesJuego({contador, establecerTiempo, establecerPalabras}){
    if(contador == false){
    return(
        <div>
            <div className="dropdown">
            <div tabIndex={0} role="button" className="btn m-1 text-xl tooltip" data-tip="Establece el timepo límite">Tiempo
                <svg class="h-8 w-8 text-indigo-600"  
                viewBox="0 0 30 24"  
                fill="none"  stroke="currentColor"  
                strokeWidth="2"  
                strokeLinecap="round"  strokeLinejoin="round">  <circle cx="12" cy="12" r="10" />  <polyline points="12 6 12 12 16 14" /></svg>
            </div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                <button onClick={establecerTiempo} value={10} className="btn btn-ghost rounded-md text-white text-xl">10s</button>
                <button onClick={establecerTiempo} value={20} className="btn btn-ghost rounded-md text-white text-xl">20s</button>
                <button onClick={establecerTiempo} value={30} className="btn btn-ghost rounded-md text-white text-xl">30s</button>
            </ul>
            </div>

            <div className="dropdown">
            <div tabIndex={0} role="button" className="btn m-1 text-xl tooltip" data-tip="Establece la cantidad de palabras">Palabras
            <svg class="h-8 w-8 text-indigo-600"  
            width="24" height="24" viewBox="0 0 24 24" 
            strokeWidth="2" stroke="currentColor" 
            fill="none" strokeLinecap="round" 
            strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  
            <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />  <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" /></svg>
            </div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
            <button onClick={establecerPalabras} value={15} className="btn btn-ghost rounded-md text-white text-xl">15 palabras</button>
                <button onClick={establecerPalabras} value={20} className="btn btn-ghost rounded-md text-white text-xl">20 palabras</button>
                <button onClick={establecerPalabras} value={40} className="btn btn-ghost rounded-md text-white text-xl">40 palabras</button>
            </ul>
            </div>
        </div>
    );
    }
} 