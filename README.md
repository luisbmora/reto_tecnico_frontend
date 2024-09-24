# Front-end Project README

Este proyecto es un Front-end basado en React que forma parte de una aplicación más grande. Utiliza las siguientes tecnologías y versiones:

- **React**: v18.3.1
- **Node.js**: v14.x (o superior)

## Requisitos

Antes de comenzar, asegúrate de tener instalado lo siguiente en tu sistema:

- [Node.js](https://nodejs.org/) versión 14.x o superior
- [npm](https://www.npmjs.com/) (generalmente viene incluido con Node.js)

## Configuración y Ejecución

1. Clona el repositorio del proyecto:

   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd test_tecnico_frontend
   ```

2. Instala las dependencias del proyecto:

   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:

   ```bash
   npm start
   ```

   Esto iniciará la aplicación en modo de desarrollo en `http://localhost:3000`.

## Estructura del Proyecto

El proyecto está estructurado de la siguiente manera:

- `src/`: Contiene todo el código fuente de la aplicación.
  - `components/`: Directorio que alberga los componentes reutilizables de la aplicación.
  - `pages/`: Directorio que contiene los componentes principales de las páginas de la aplicación.
  - `context/`: Directorio que contiene los proveedores de contexto de la aplicación (como el contexto de autenticación).
  - `styles/`: Directorio que contiene los archivos de estilos CSS o SCSS.
  - `App.js`: Componente principal de la aplicación.
- `package.json`: Archivo que define las dependencias y los scripts de ejecución del proyecto.

## Características Principales

- **Autenticación**: El proyecto utiliza un sistema de autenticación basado en contexto de React y tokens JWT.
- **Navegación**: La aplicación usa react-router-dom para manejar la navegación entre páginas.
- **Diseño**: Se utiliza la biblioteca de componentes Semantic UI React para el diseño y la interfaz de usuario.
- **Notificaciones**: Se integra la biblioteca react-toastify para mostrar notificaciones al usuario.

