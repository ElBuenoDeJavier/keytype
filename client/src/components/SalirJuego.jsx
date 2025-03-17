import React from "react";
export default function SalirJuego ({salirJuego, contador}){
    if(contador){
        return(
            <div className="flex justify-center mt-20">
            <button onClick={salirJuego} className="cursor-pointer text-gray-400 underline hover:text-indigo-800">Salir juego</button>
            </div>
        );
    }
}