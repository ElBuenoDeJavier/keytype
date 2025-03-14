import React from "react";
import { useNavigate } from 'react-router-dom';

const withNavigate = (Component) => {
    // Esto devuelve una función que recibe props y devuelve un componente
    // que recibe props y navigate
    // El componente que devuelve esta función navega a través de la función navigate
  return (props) => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
};

export default withNavigate;