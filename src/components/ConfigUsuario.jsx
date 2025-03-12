import React from 'react';
function Contador({mostrarlogin, mostrarestadisticas, mostrarConfigUsuario, dataUsuario, cerrarSesion}){
    if (!mostrarlogin && !mostrarestadisticas && mostrarConfigUsuario){
        return(
            <div className="mockup-browser border border-base-300 w-4/12 h-6/12">
            <div className="mockup-browser-toolbar">
              
            </div>

            <div className='grid place-content-center'>

                <h1 className="fieldset-legend text-center text-5xl font-extrabold bg-gradient-to-bl from-purple-700 to-indigo-700 bg-clip-text text-transparent leading-normal">
                {dataUsuario.name}</h1>

                <div className="card bg-base-100 w-96 shadow-sm">
                    <div className="card-body">
                        <h2 className="card-title">Email</h2>
                        <p>{dataUsuario.email}</p>
                    </div>
                    <div className="card-body">
                    <h2 className="card-title">Password</h2>
                    <p>{dataUsuario.password}</p>
                    </div>
                    <button onClick={cerrarSesion} className='btn btn-error'>Cerrar sesion</button>
                </div>
            </div>
          </div>
        ) 
    }
}
export default Contador;