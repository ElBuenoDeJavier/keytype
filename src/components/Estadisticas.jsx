import React from "react";
export default class Estadisticas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arrayUsuarios: [],
        };
    }
    //Para obtener todos los usuarios en un array
    async getTodosUsuarios (){
        const endpoint = 'http://localhost:5050/puntuacion/';
        try{
        const response = await fetch(endpoint, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        if (response.ok){
            const arrayUsuarios = data;
            //Para ordernar a los usuario por caracteres escritos
            arrayUsuarios.sort((a, b) => {
                if (a.escritos > b.escritos) {
                    return -1;
                }
                if (a.escritos < b.escritos) {
                    return 1;
                }
                return 0;
            }
            );
            //Para ordenar los usuarios por puntaje
            arrayUsuarios.sort((a, b) => {
                if ((Math.round(100*(a.aciertos/a.escritos))) > (Math.round(100*(b.aciertos/b.escritos)))) {
                    return -1;
                }
                if ((Math.round(100*(a.aciertos/a.escritos))) < (Math.round(100*(b.aciertos/b.escritos)))) {
                    return 1;
                }
                return 0;
            });
            //Para mostrar solo los 10 primeros corto el array hasta la posición 4
            this.setState({arrayUsuarios: arrayUsuarios.splice(0,4)});
        }else{
            console.error(data.message); 
        }
        }catch (error){
        console.error('Error:', error);
        }
    };
    //Para que se ejecute la funcion al cargar la pagina
    componentDidMount() {
        this.getTodosUsuarios();
    }
    render(){
        return (
            <ol>
                <h1 className="text-6xl font-extrabold bg-gradient-to-bl from-blue-500 to-indigo-800 bg-clip-text text-transparent leading-normal text-center">TOP 4 JUGADORES</h1>
                    {this.state.arrayUsuarios.map((usuario, index) => {
                        return (
                            <div className="mt-2 ">                            
                                <div className="stats shadow border-2 border-indigo-800 flex justify-center">

                                <div className="stat place-items-center hover:bg-indigo-800">
                                    <div className="stat-title">Usuario</div>
                                    <div className="stat-value font-extrabold bg-gradient-to-bl from-white to-indigo-700 bg-clip-text text-transparent leading-normal">{usuario.name}</div>
                                </div>
                            
                                <div className="stat place-items-center hover:bg-gray-900">
                                    <div className="stat-title">Puntuacion</div>
                                    <div className="stat-value">{Math.round(100*(usuario.aciertos/usuario.escritos))}</div>
                                    <div className="stat-desc">{
                                        Math.round(100*(usuario.aciertos/usuario.escritos)) == 100 ? "⭐⭐⭐⭐⭐":
                                        Math.round(100*(usuario.aciertos/usuario.escritos)) > 80 ? "⭐⭐⭐⭐":
                                        Math.round(100*(usuario.aciertos/usuario.escritos)) > 70 ? "⭐⭐⭐":
                                        "⭐⭐"
                                    }</div>
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
                    <div className="flex justify-center">
                    <button onClick={this.props.volverInicio} className='cursor-pointer underline mt-10 hover:text-indigo-600'>Volver</button>
                    </div>
            </ol>
            
        )
    }
}