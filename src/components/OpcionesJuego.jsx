import React from "react";
export default function OpcionesJuego({contador}){
    if(contador == false){
    return(
        <div className="flex rounded-md shadow-xs justify-center mb-3" role="group">
            <div className="mr-3">
            <button type="button" className="px-4 py-2 text-2xl text-indigo-800 bg-transparent border 
            border-indigo-800 rounded-s-lg hover:bg-gray-900 focus:z-10 focus:ring-2 focus:ring-indigo-400 focus:bg-indigo-800
            focus:text-white">
                10s
            </button>
            <button type="button" className="px-4 py-2 text-2xl font-medium text-indigo-800 bg-transparent border-t border-b 
            border-indigo-800 hover:bg-gray-900 focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-indigo-800
            focus:text-white">
                20s
            </button>
            <button type="button" className="px-4 py-2 text-2xl font-medium text-indigo-800 bg-transparent border 
            border-indigo-800 rounded-e-lg hover:bg-gray-900 focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-indigo-800
            focus:text-white">
                30s
            </button>
            </div>

            <div className="ml-3">
            <button type="button" className="px-4 py-2 text-2xl text-indigo-800 bg-transparent border 
            border-indigo-800 rounded-s-lg hover:bg-gray-900 focus:z-10 focus:ring-2 focus:ring-indigo-400 focus:bg-indigo-800
            focus:text-white">
                15 palabras
            </button>
            <button type="button" className="px-4 py-2 text-2xl font-medium text-indigo-800 bg-transparent border-t border-b 
            border-indigo-800 hover:bg-gray-900 focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-indigo-800
            focus:text-white">
                20 palabras
            </button>
            <button type="button" className="px-4 py-2 text-2xl font-medium text-indigo-800 bg-transparent border 
            border-indigo-800 rounded-e-lg hover:bg-gray-900 focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-indigo-800
            focus:text-white">
                40 palabras
            </button>
            </div>
        </div>
    );
    }
} 