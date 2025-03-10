import React from 'react';

function Header({contador, pulsarBotonLogin, pulsarLogo, dataUsuario}) {
    if(contador == false){
    return (
        <header className="bg-gray-950 font-mono absolute p-7 w-screen">
            <nav className="flex justify-between items-center mx-auto">
                <div>
                    <h1 onClick={pulsarLogo} className='text-5xl text-indigo-800 hover:text-white'>⌨️KeyType</h1>
                </div>
                <div className="flex items-center gap-3">

                    <button className="px-5 py-2"><svg className="h-8 w-8 text-indigo-800 hover:text-indigo-500"  width="24" height="24" 
                    viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />  <circle cx="12" cy="12" r="3" /></svg></button>
                    
                    <button className="px-5 py-2">
                    <svg class="h-8 w-8 text-indigo-800 hover:text-indigo-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                    </button>
                    
                    {!dataUsuario?<button onClick={pulsarBotonLogin} className="text-white px-5 py-2 rounded-full bg-indigo-800 hover:bg-indigo-500">Iniciar sesión</button>:''}

                    {dataUsuario?<div  className='text-white flex'><svg className="h-8 w-8 text-indigo-800 hover:text-indigo-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>{dataUsuario.name}</div>:''}
                </div>
            </nav>
        </header>
    );
    }
}

export default Header;