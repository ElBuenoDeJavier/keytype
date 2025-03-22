import React, { useEffect } from 'react';
import EstadisticasUsuario from './EstadisticasUsuario';

export default function ConfigUsuario({ dataUsuario, cerrarSesion, volverInicio, tiempo2 }) {
    
    return (
        <div className="w-10/12 h-8/12">
            <div className="mockup-browser-toolbar"></div>

            <div className='flex flex-col justify-center items-center'>
                <h1 className="fieldset-legend text-center text-5xl font-extrabold bg-gradient-to-bl from-purple-700 to-indigo-700 bg-clip-text text-transparent leading-normal">
                    {dataUsuario.name}
                </h1>
                <h1 className="fieldset-legend text-center text-3xl font-extrabold text-gray-700 leading-normal">
                    {dataUsuario.email}
                </h1>
                <button onClick={cerrarSesion} className='btn btn-error'>Cerrar sesión</button>
            </div>
            <EstadisticasUsuario name={dataUsuario.name} tiempo2={tiempo2}/>
            <div className='flex justify-center'>
            <button onClick={volverInicio} className='underline mt-10 hover:text-indigo-600'>Volver</button>
            </div>
            </div>
    );
}