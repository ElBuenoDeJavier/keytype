import React from "react";
export default function OpcionesJuego({contador, establecerTiempo, establecerPalabras}){
    if(contador == false){
    return(
        <div>
        <div className="navbar flex justify-center mb-3 ">
            <div className="mr-1.5 shadow-sm">
            <button onClick={establecerTiempo} value={10} className="btn btn-ghost rounded-md border border-indigo-800 text-white text-xl">10s</button>
            <button onClick={establecerTiempo} value={20} className="btn btn-ghost rounded-md border border-indigo-800 text-white text-xl">20s</button>
            <button onClick={establecerTiempo} value={30} className="btn btn-ghost rounded-md border border-indigo-800 text-white text-xl">30s</button>
            </div>
            <div className="ml-1.5">
            <button onClick={establecerPalabras} value={15} className="btn btn-ghost rounded-md border border-indigo-800 text-white text-xl">15 palabras</button>
            <button onClick={establecerPalabras} value={20} className="btn btn-ghost rounded-md border border-indigo-800 text-white text-xl">20 palabras</button>
            <button onClick={establecerPalabras} value={40} className="btn btn-ghost rounded-md border border-indigo-800 text-white text-xl">40 palabras</button>
            </div>
        </div>
        </div>
    );
    }
} 