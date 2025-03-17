import React from "react";
export default function MostrarJuego({children}){
    return (
        <div className="w-7/12 h-8/12 absolute">
            {children}
        </div>
    );
}