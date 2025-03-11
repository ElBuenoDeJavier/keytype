import React from "react";
export default function MostrarEstadisticas({children, mostrarlogin, mostrarestadisticas}){
    //si la variable de mostrar login es false lo que se muestra es el juego
    if (mostrarlogin == false && mostrarestadisticas == true){
    return (
        <div className="w-7/12 h-8/12 absolute">
            {children}
        </div>
    );
    }
}