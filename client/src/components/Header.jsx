import React from 'react';

function Header({contador, pulsarBotonLogin, pulsarLogo, dataUsuario, pulsarEstadisticas, pulsarUsuario}) {
    if(contador == false){
    return (
        <header className="font-mono absolute p-7 w-screen">
            <nav className="flex justify-between items-center mx-auto">
                <div>
                    <h1 onClick={pulsarLogo} className='animate-pulse text-4xl text-gray-300 hover:text-white font-mono font-extrabold tooltip tooltip-bottom' data-tip="Jugar">
                        <i>KEYTYPE</i></h1>
                </div>
                <div className="flex items-center gap-3">
                    
                    <button onClick={pulsarEstadisticas} className="cursor-pointer px-5 py-2 tooltip" data-tip="Estadisticas">
                    <svg className="h-8 w-8 text-indigo-800 hover:text-indigo-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                    </button>

                    {!dataUsuario?<button onClick={pulsarBotonLogin} className="btn btn-soft btn-primary text-xl">Iniciar sesión</button>:''}

                    {dataUsuario?
                    <div onClick={pulsarUsuario} className='text-white tooltip tooltip-left' data-tip="Configuración cuenta">
                        <div className="avatar avatar-online avatar-placeholder">
                            <div className="bg-black hover:bg-gray-900 text-neutral-content w-20 rounded-full">
                                <span className="text-white hover:text-indigo-400 font-extrabold">{dataUsuario.name}</span>
                            </div>
                        </div>   
                    </div>:''}
                    
                </div>
            </nav>
        </header>
    );
    }
}

export default Header;