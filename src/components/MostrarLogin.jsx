import React from "react";
export default function mostrarLogin({children, mostrarlogin, mostrarestadisticas, mostrarConfigUsuario}){
    //si la variable de mostrar login es true se muestra el formulario de register y de login
    if (mostrarlogin && !mostrarestadisticas && !mostrarConfigUsuario){
        return (
            <div className="w-7/12 h-8/12 absolute">
                {children}
            </div>
        );
        }
}