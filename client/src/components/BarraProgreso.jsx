import React from "react";

export default function BarraProgreso({ tiempoRestante, tiempo2, contador }) {
    if(contador){
        return (
            <div className='flex justify-center'>
                <div className="w-1/6 h-3 bg-gray-900 rounded-full overflow-hidden mb-1">
                    <div
                    className={`h-full ${tiempoRestante < tiempo2/3 ? `bg-yellow-800` : `bg-indigo-700` }
                    transition-all duration-300`}
                    style={{ width: `${(tiempoRestante / tiempo2) * 100}%` }}
                    />
                </div>
            </div>
        )
    }
    
}