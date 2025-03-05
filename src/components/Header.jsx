import React from 'react';

function Header({contador}) {
    if(contador == false){
    return (
        <header className="bg-gray-950 font-mono absolute p-7 w-screen">
            <nav className="flex justify-between items-center mx-auto">
                <div>
                    <h1 className='text-5xl text-indigo-800'>⌨️Raquel💖💘</h1>
                </div>
                <div className="flex items-center gap-3">
                    <button className="text-white px-5 py-2 rounded-full bg-indigo-800 hover:bg-indigo-600">Iniciar sesión</button>
                    <ion-icon name="menu" className="text-3xl cursor-pointer md:hidden"></ion-icon>
                </div>
            </nav>
        </header>
    );
    }
}

export default Header;