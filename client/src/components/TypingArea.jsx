// Archivo: TypingArea.jsx (o como prefieras llamarlo)

// Archivo: TypingArea.jsx

import React from 'react';

// Componente unificado que reemplaza a InputUsuario y GenerarPalabras
function TypingArea({ palabras, entradaUsuario, handleInputChange }) {
    
    const focusInput = () => {
        // Al hacer clic en el área de texto, se enfoca el input oculto.
        document.getElementById('hidden-input')?.focus();
    };

    return (
        // Quitamos text-2xl para que herede el tamaño del padre.
        <div className="relative" onClick={focusInput}>
            
            <input
                id="hidden-input"
                type="text"
                value={entradaUsuario}
                onChange={handleInputChange}
                className="absolute left-0 top-0 h-full w-full cursor-default opacity-0"
                autoFocus
            />

            {/* Contenedor del texto visible con los estilos base que tenías */}
            <div className="leading-relaxed break-all select-none">
                {palabras.split('').map((charEsperado, index) => {
                    const esCursor = index === entradaUsuario.length;
                    const charEntrada = entradaUsuario[index];
                    
                    // --- Lógica de renderizado ---

                    // 1. Renderizar el cursor en la posición actual
                    if (esCursor) {
                        return (
                            <React.Fragment key={`${index}-cursor`}>
                                <Cursor />
                                <span className="text-gray-500">{charEsperado}</span>
                            </React.Fragment>
                        );
                    }

                    // 2. Caracteres ya escritos
                    if (index < entradaUsuario.length) {
                        const esCorrecto = charEsperado === charEntrada;
                        
                        if (esCorrecto) {
                            return (
                                <span key={index} className="text-white">
                                    {charEsperado}
                                </span>
                            );
                        } else {
                            // Si el error es en un espacio, mostramos `_` como pediste
                            if (charEsperado === ' ') {
                                return <span key={index} className="text-red-600 underline">_</span>;
                            }
                            // Si el error es en otro carácter, lo marcamos en rojo
                            return (
                                <span key={index} className="text-red-600">
                                    {charEsperado}
                                </span>
                            );
                        }
                    }

                    // 3. Caracteres aún no escritos (después del cursor)
                    return (
                        <span key={index} className="text-gray-500">
                            {charEsperado}
                        </span>
                    );
                })}
                 {/* Si el usuario ha completado todo el texto, el cursor se muestra al final */}
                 {entradaUsuario.length === palabras.length && <Cursor />}
            </div>
        </div>
    );
}

function Cursor() {
    // Puedes ajustar la altura (h-7) para que coincida con tu fuente
    return <span className='inline-block animate-pulse bg-indigo-800 w-0.5 h-7'></span>;
}

export default TypingArea;