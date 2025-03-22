import React, { useState, useEffect } from "react";

export default function EstadisticasUsuario({ name, tiempo2 }) {
    const [arrayUsuarios, setArrayUsuarios] = useState([]);

    //Para obtener todos los usuarios en un array
    async function getUsuario() {
        const endpoint = `http://localhost:5050/puntuacion/name=${name}`;
        try {
            const response = await fetch(endpoint, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await response.json();
            if (response.ok) {
                let usuarios = data;
                //Para ordernar a los usuario por caracteres escritos
                usuarios.sort((a, b) => {
                    if (a.escritos > b.escritos) {
                        return -1;
                    }
                    if (a.escritos < b.escritos) {
                        return 1;
                    }
                    return 0;
                });
                //Para ordenar los usuarios por puntaje
                usuarios.sort((a, b) => {
                    if ((Math.round(100 * (a.aciertos / a.escritos))) > (Math.round(100 * (b.aciertos / b.escritos)))) {
                        return -1;
                    }
                    if ((Math.round(100 * (a.aciertos / a.escritos))) < (Math.round(100 * (b.aciertos / b.escritos)))) {
                        return 1;
                    }
                    return 0;
                });
                //Para mostrar solo los 10 primeros corto el array hasta la posición 4
                setArrayUsuarios(usuarios.slice(0, 4));
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    //Para que se ejecute la funcion al cargar la pagina
    useEffect(() => {
        getUsuario();
    }, [name]);

    return (
        <div className="max-h-96 overflow-y-auto">
        <ol>
            {arrayUsuarios.map((usuario, index) => {
                return (
                    <div className="mt-2 " key={index}>
                        <div className="stats shadow border-2 border-indigo-800 flex justify-center">

                            <div className="stat place-items-center hover:bg-indigo-800">
                                <div className="stat-title">Usuario</div>
                                <div className="stat-value font-extrabold bg-gradient-to-bl from-white to-indigo-700 bg-clip-text text-transparent leading-normal">{usuario.name}</div>
                            </div>

                            <div className="stat place-items-center hover:bg-gray-900">
                                <div className="stat-title">Puntuacion</div>
                                <div className="stat-value">{Math.round(100 * (usuario.aciertos / usuario.escritos))}</div>
                                <div className="stat-desc">{
                                    Math.round(100 * (usuario.aciertos / usuario.escritos)) === 100 ? "⭐⭐⭐⭐⭐" :
                                        Math.round(100 * (usuario.aciertos / usuario.escritos)) > 80 ? "⭐⭐⭐⭐" :
                                            Math.round(100 * (usuario.aciertos / usuario.escritos)) > 70 ? "⭐⭐⭐" :
                                                "⭐⭐"
                                }</div>
                            </div>

                            <div className="stat place-items-center hover:bg-yellow-800">
                                <div className="stat-title">Caracteres por segundo</div>
                                <div className="stat-value">{(usuario.aciertos/tiempo2).toFixed(2)}</div>
                            </div>

                            <div className="stat place-items-center hover:bg-green-800">
                                <div className="stat-title">Aciertos</div>
                                <div className="stat-value">{usuario.aciertos}</div>
                            </div>

                            <div className="stat place-items-center hover:bg-red-800">
                                <div className="stat-title">Errores</div>
                                <div className="stat-value">{usuario.errores}</div>
                            </div>

                            <div className="stat place-items-center hover:bg-gray-900">
                                <div className="stat-title">Caracteres escritos</div>
                                <div className="stat-value">{usuario.escritos}</div>
                            </div>

                        </div>
                    </div>
                )
            })}
        </ol>
        </div>
    );
}