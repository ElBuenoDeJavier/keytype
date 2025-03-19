# KeyType ⌨️

**Desarrollado por:** Javier Uberos

KeyType es un juego interactivo diseñado para practicar y mejorar las habilidades de mecanografía. 
El juego cuenta con un sistema de puntuación y un contador para medir el tiempo de cada sesión. 
Además, permite a los usuarios registrarse, iniciar sesión y guardar su progreso utilizando un sistema de autenticación basado en JWT.

## Tecnologías Utilizadas

- **Frontend:**
  - React.js: Biblioteca de JavaScript para construir interfaces de usuario.
  - Tailwind CSS: Framework CSS para un diseño limpio y responsive.

- **Backend:**
  - Node.js: Entorno de ejecución de JavaScript en el servidor.
  - Express.js: Framework de Node.js para manejar rutas y solicitudes HTTP.
  - MongoDB: Base de datos NoSQL para almacenar los usuarios y sus puntuaciones.
  - JWT (JSON Web Tokens): Autenticación segura para gestionar las sesiones de los usuarios.

## Características

- **Juego de mecanografía:** Los usuarios deben escribir correctamente las palabras que se muestran en la pantalla.
- **Contador de tiempo:** Mide el tiempo que tarda el jugador en escribir las palabras correctamente.
- **Sistema de puntuación:** Los jugadores reciben una puntuación basada en la precisión.
- **Autenticación:** Los usuarios pueden registrarse, iniciar sesión y guardar su progreso.
- **Almacenamiento de puntuaciones:** Las puntuaciones de los jugadores se guardan en la base de datos para competir con otros usuarios.

## Instalación✅

### Requisitos Previos

1. Tener **Node.js** y **npm** instalados en tu máquina.
2. Tener una cuenta de MongoDB o usar una base de datos local.

### Clonar el Repositorio

```bash
git clone https://github.com/tuusuario/keytype.git
cd keytype
```
### Arrancar fronted
```bash
cd client
npm run dev
```
### Arrancar servidor
```bash
cd server
node --env-file=config.env server
```
