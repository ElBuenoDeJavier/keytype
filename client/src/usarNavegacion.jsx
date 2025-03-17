import React from "react";
import { useNavigate } from 'react-router-dom';


export default function usarNavegacion(Component){
    // devuelve un componente con navigate
    //App podra navegar a través de la función navigate
    return (props) => {
      const navigate = useNavigate();
      return <Component {...props} navigate={navigate} />;
    };
}