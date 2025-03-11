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
            //Para ordenar los usuarios por aciertos
            arrayUsuarios.sort((a, b) => {
                if (((a.aciertos*0.4)+(a.errores*0.4)+(a.escritos*0.2)) > ((b.aciertos*0.4)+(b.errores*0.4)+(b.escritos*0.2))) {
                    return -1;
                }
                if (((a.aciertos*0.4)+(a.errores*0.4)+(a.escritos*0.2)) < ((b.aciertos*0.4)+(b.errores*0.4)+(b.escritos*0.2))) {
                    return 1;
                }
                return 0;
            }
            );
            //Para mostrar solo los 10 primeros corto el array hasta la posición 10
            this.setState({arrayUsuarios: arrayUsuarios.splice(0,10)});
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
            <div>
                <h1 className="text-white text-4xl text-center">10 mejores jugadores</h1>
                <ol>
                    {this.state.arrayUsuarios.map((usuario, index) => {
                        return (
                            <div key={index} className="bg-indigo-800 p-2 m-2 rounded-lg">
                                <p className="text-white">{usuario.name} {
                                Math.round((usuario.aciertos*0.4)+(usuario.errores*0.4)+(usuario.escritos*0.2))} 
                                {
                                    Math.round((usuario.aciertos*0.4)+(usuario.errores*0.4)+(usuario.escritos*0.2)) > 90 ? "⭐⭐⭐⭐⭐":
                                    Math.round((usuario.aciertos*0.4)+(usuario.errores*0.4)+(usuario.escritos*0.2)) > 80 ? "⭐⭐⭐⭐":
                                    Math.round((usuario.aciertos*0.4)+(usuario.errores*0.4)+(usuario.escritos*0.2)) > 70 ? "⭐⭐⭐":
                                    "⭐⭐"
                                }</p>
                            </div>
                        )
                    })}
                </ol>

            </div>
        )
    }
}