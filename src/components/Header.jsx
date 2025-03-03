import React from 'react';

function Header() {
    return (
        <header className="p-4 ">
            <nav className="flex justify-between items-center mx-auto">
                <div>
                    <h1 className='text-white text-5xl'>⌨️</h1>
                </div>
                <div className="nav-links duration-500 md:static absolute
                 text-white md:min-h-fit min-h-[60vh] left-0 top-[-100%] md:w-auto w-full flex items-center px-5">
                    <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-12">
                        
                        <li>
                            <a className="hover:text-gray-500" href="#">Opción</a>
                        </li>
                    </ul>
                </div>
                <div className="flex items-center gap-3">
                    <button className="text-white px-5 py-2 rounded-full hover:bg-indigo-800">Iniciar sesión</button>
                    <ion-icon name="menu" className="text-3xl cursor-pointer md:hidden"></ion-icon>
                </div>
            </nav>
        </header>
    );
}

export default Header;