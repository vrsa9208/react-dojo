# React Project from Scratch

El objetivo de este laboratorio es crear un proyecto con React desde cero, sin hacer uso de herramientas externas como **create-react-app**. Esto nos dará visibilidad sobre el proceso que se sigue para arrancar una aplicación desde cero y hacer uso de React y JSX.

## Pre-requisitos

- [Node](https://nodejs.org/en/)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Chrome](https://www.google.com/chrome/)
- ~~Internet Explorer (Para instalar Chrome)~~

## Herramientas útiles

Estas extensiones NO son necesarias, pero considerando mi experiencia te puedo asegurar que te ahorrarán valiosos segundos y te ayudarán a desarrollar de una manera más sencilla.

- Extensiones Visual Studio Code

  - ESLint
  - Path Intellisense
  - ES7 React/Redux/GraphQL/React-Native snippets
  - Bracket Pair Colorizer
  - Prettier - Code formatter
  - vscode-icons
  - Color Highlight
  - Winter is Coming Theme

- Configuración de VS Code
  - Editor: Format on save

## Instrucciones

### Creación del proyecto

1. El primer paso es crear la carpeta raíz y acceder a ella. Podemos hacerlo desde nuestro navegador de archivos, o bien haciendo uso de la consola con el siguiente comando:

   ```
   mkdir react-dojo && cd $_
   ```

2. Inicializamos nuestro proyecto de Node

   ```
   npm init
   ```

   En este punto, se nos pedirá ingresar información relacionado a nuestro nuevo proyecto, pero igual que con la licencia de tu iPhone / Android, puedes dar Enter, Enter y Enter hasta que haya terminado el proceso.

### Crear los archivos de entrada de la aplicación

Muy bien! Ahora que ya tenemos el archivo _package.json_ recién creado, empezemos poniendo la piedra angular del proyecto. Me refiero a webpack. Este modulo tiene varias funcionalidades. Pero las que nos interesa configurar por el momento son las siguientes:

- Resolver las dependencias hacía otros archivos que usemos en nuestro código.
- Compilar los recursos y el código necesario en un sólo archivo bundle.
- Integrar el contenido de nuestro archivo bundle en nuestro archivo index de HTML.
- Aplicar el proceso para verificar nuestro código con ayuda de ESLint.
- Integrar nuestro código con JSX (Javascript + XML) para que sea legible para el motor de Javascript.
- Importar archivos de estilo en nuestro código sin hacer uso de etiquetas en el archivo de HTML.

Los pasos para configurar webpack son los siguientes:

1. Primero crearemos nuestro punto de entrada a la aplicación. Este será un archivo llamado _index.js_ que crearemos en una nueva carpeta llamada _src_. Por ahora sólo pondremos código para lanzar una alerta en pantalla:

   ```
    alert("React-Dojo");
   ```

2. Crearemos nuestro archivo index de HTML (_index.html_) en la misma carpeta _src_ que creamos en el paso anterior. Si empezamos a escribir **html** Visual Studio Code nos dará la opción de autocompletar con html:5. Si seleccionamos esta opción, el editor insertará el template básico de un archivo HTML 5. Por el momento, sólo cambiaremos el titulo del documento y agregaremos un **div** con id **app**. El contenido de _index.html_ nos quedará de la siguiente manera:

   ```
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>Document</title>
    </head>
    <body></body>
    </html>
   ```

### Configuración básica de webpack

1.  Ahora agregaremos nuestros primeros modulos de Node para poder usar webpack. Para lograrlo, ejecutamos desde consola el siguiente comando.

    ```
    npm install --save-dev webpack webpack-cli html-webpack-plugin
    ```

2.  Una vez que se hayan instalado las dependencias de Node, crearemos un nuevo archivo en la carpeta raíz del proyecto (_react-dojo_). Este archivo se llamará _webpack.config.dev.js_. Por el momento sólo definiremos la entrada y salida del proceso de webpack, así como el plugin que importará el código en nuestro HTML:

    ```
     const path = require("path");
     const HtmlWebpackPlugin = require("html-webpack-plugin");

     module.exports = {
     mode: "development",
     target: "web",
     devtool: "cheap-module-source-map",
     entry: "./src/index.js",
     output: {
         path: path.resolve(__dirname, "build"),
         filename: "bundle.js",
         publicPath: "/"
     },
     plugins: [
         new HtmlWebpackPlugin({
         template: "./src/index.html"
         })
     ]
     };
    ```

3.  Para poder ejecutar webpack vamos a crear un script en nuestro archivo _package.json_. Dentro de este archivo encontraremos una sección llamada **scripts**. Aquí agregaremos el siguiente script:

    ```
     "webpack-build": "webpack --config webpack.config.dev.js"
    ```

4.  Ahora podemos ejecutar nuestro script **webpack-build** para poder ver el resultado del proceso de webpack. Esto se hace ejecutando desde consola el siguiente comando:

    ```
    npm run webpack-build
    ```

    Una vez que ejecutamos este script, debemos ver una nueva carpeta llamada _build_ a nivel raíz y esta contendrá los siguientes archivos:

    - bundle.js
    - bundle.js.map
    - index.html

5.  Como último paso de esta sección eliminaremos la carpeta de _build_. En pasos posteriores usaremos un server creado por webpack que tomará el contenido en memoria y no será necesario tener la carpeta build.

### Crear un servidor de desarrollo con webpack

Otra funcionalidad interesante de webpack es la de levantar un servidor de desarrollo para exponer el contenido generado por el mismo. Si en algún punto llegara Nuestro siguiente paso será configurar este server y arrancarlo.

1. Como primer paso, necesitaremos instalar los modulos necesarios para hacer uso de esta funcionalidad:

   ```
   npm install --save-dev webpack-dev-server
   ```

2. Ya que tenemos las dependencias necesarias, agregaremos la configuración dentro del archivo _webpack.config.dev.js_. Lo pondremos en el objeto existente, después del campo **plugins**:

   ```
    devServer: {
        stats: "minimal",
        overlay: true,
        historyApiFallback: true,
        headers: { "Access-Control-Allow-Origin": "*" }
    }
   ```

3. Ahora crearemos el script en nuestro archivo _package.json_ para arrancar nuestro server de desarrollo en el puerto 3000:

   ```
    "webpack-dev": "webpack-dev-server --config webpack.config.dev.js --port 3000"
   ```

4. Ejecutamos nuestro script desde consola:

   ```
   npm run webpack-dev
   ```

5. Si todo ha ido bien, podemos ir a nuestro navegador e ir a la URL _http://localhost:3000/_. La página debe mostrarnos una alerta con el mensaje "React-Dojo". El proceso de **webpack-dev-server** seguirá corriendo y si hacemos algún cambio, este se actualizará automáticamente. Si en algun momento queremos detenerlo, podremos hacerlo presionando **ctrl + c** en la consola.

### Agregando la validación de código con ESLint

ESLint es una gran ayuda al momento de codificar pues nos permite validar la calidad de nuestro código y evita que caigamos en los errores más comunes. En esta sección agregaremos la validación de ESLint como parte del proceso de webpack.

1. Como en pasos anteriores, lo primero será agregar las dependencias a nuestro proyecto:

   ```
   npm install --save-dev eslint eslint-loader
   ```

2. Ahora que ya tenemos nuestras dependencias en el proyecto, vamos a modificar la configuración de webpack. Esto lo haremos agregando el siguiente bloque en nuestro archivo _webpack.config.dev.js_:

   ```
   module: {
       rules: [
       {
           test: /\.(js|jsx)$/,
           exclude: /node_modules/,
           use: ["eslint-loader"]
       }
       ]
   }
   ```

   Lo que este bloque de código hará por nosotros es que al leer archivos con extensión .js o .jsx aplicará una revisión con ESLint antes de generar el bundle.

3. Para que ESLint pueda funcionar correctamente, necesitamos definir las reglas que ocupará al momento de revisar el código. Crearemos un archivo en la carpeta raíz llamado _.eslintrc.js_ y ahí pondremos el siguiente código:

   ```
   module.exports = {
   extends: [
       "eslint:recommended",
       "plugin:react/recommended",
       "plugin:import/errors",
       "plugin:import/warnings"
   ],
   parser: "babel-eslint",
   parserOptions: {
       ecmaVersion: 2018,
       sourceType: "module",
       ecmaFeatures: {
       jsx: true
       }
   },
   env: {
       browser: true,
       node: true,
       es6: true,
       jest: true
   },
   rules: {
       "no-debugger": "off",
       "no-console": "off",
       "no-unused-vars": "warn",
       "react/prop-types": "warn"
   },
   settings: {
       react: {
       version: "detect"
       }
   },
   root: true
   };
   ```

4. Para aplicar las reglas de ESLint nos hemos adelantado un poco y estamos usando algunos plugins de react y para los imports. Para poder usarlos, instalaremos los paquetes con npm. Desde consola ejecutamos:

   ```
   npm install --save-dev eslint eslint-loader eslint-plugin-react eslint-plugin-import babel-eslint
   ```

5. Si ahora ejecutamos nuestro script **webpack-dev** veremos que ha compilado exitosamente aunque aún no cuenta con React. Como prueba de la funcionalidad de ESLint, agregaremos una constante no utilizada en nuestro archivo _index.js_ en la carpeta src:

   ```
   const notUsedVar = "Not Used";
   ```

   El resultado es que webpack ha compilado con warnings y se despliega en consola el motivo, el cual es que no usamos la constante recién creada.

   Ya podemos quitar esta constante de nuestro código en _index.js_. En este punto ya tenemos configurado ESLint en nuestro proyecto.

### Agregando Babel al proyecto

Babel es un compilador de Javascript que nos permite hacer uso de las funcionalidades más actuales incluso en navegadores antiguos. Entre otras cosas, lo que también nos permite Babel es tomar código JSX (Javascript + XML), el cual usa React, y lo transforma en una versión entendible para Javascript. De nuevo, webpack integrará en su proceso de empaquetado el proceso de Babel, el cual se ejecutará después de haber revisado el código con ESLint.

1. De nuevo iniciamos instalando las dependencias con NPM desde consola:

   ```
   npm install --save-dev @babel/core babel-loader babel-preset-react-app
   ```

2. Configuramos el archivo _webpack.config.dev.js_ para que use la herramienta **babel-loader** en el proceso de empaquetado de webpack. Esto lo haremos agregando en las reglas ya creadas el nuevo elemento **babel-loader** La linea donde definimos que se usará **eslint-loader** quedará de la siguiente manera:

   ```
   use: ["babel-loader", "eslint-loader"]
   ```

   Estos loaders se ejecutarán de derecha a izquierda, ejecutando el proceso de la siguiente manera: Primero se ejecutará eslint-loader y la sálida del proceso alimentará al proceso de babel-loader.

   Otro punto a agregar en este mismo archivo es la inclusión de la siguiente linea, justo antes de llamar a module.exports:

   ```
   process.env.NODE_ENV = "development";
   ```

   Esto es necesario como parte del proceso de babel al usar React.

3. Ahora que ya tenemos la configuración de webpack sólo nos resta agregar la configuración de Babel. Esta la pondremos en el archivo _package.json_. Agregaremos un nuevo campo llamado **babel** con el siguiente contenido:

   ```
   "babel": {
       "presets": [
       "babel-preset-react-app"
       ]
   }
   ```

### Cargando archivos de estilo con Babel

En algún punto de estos laboratorios importaremos archivos de estilo (.css) desde Javascript. Para que webpack sepa como cargarlos desde JS, necesitaremos definirlo en nuestra configuración.

1. Las dependencias a instalar son las siguientes:

   ```
   npm install --save-dev css-loader style-loader
   ```

2. Ahora agregaremos una nueva regla para que Webpack sepa que si encuentra archivos con la extensión .css los procese con los loaders que acabamos de instalar. Para esto modificaremos nuestro archivo de _webpack.config.dev.js_. Agregaremos dentro de module/rules el siguiente objeto:

   ```
   {
     test: /(\.css)$/,
     use: ["style-loader", "css-loader"]
   }
   ```

3. Si ejecutamos el script de _webpack-dev_ debemos ver que la compilación ha sido exitosa y ya estaremos listos para usar React.

### Hora de usar React !

Bueno, ya es tiempo de entrar en materia y ver exactamente lo que nos atañe. Después de haber invertido tiempo en preparar nuestro server de desarrollo con todo lo necesario, iniciaremos con un flujo muy básico de React.

1. Como primer paso, instalaremos las dependencias necesarias:

   ```
   npm install react react-dom
   ```

   Notese que ya no usamos la bandera --save-dev dado que _react_ y _react-dom_ ya formarán parte de nuestro empaquetado final.

2. Ahora abriremos nuestro archivo _index.js_ y reemplazaremos el código actual por el siguiente segmento de código:

   ```
    import React from "react";
    import { render } from "react-dom";

    function App() {
        return <div>React-Dojo</div>;
    }

    render(<App />, document.getElementById("app"));
   ```

   Aquí estamos declarando nuestro primer componente de React llamado _App_ y lo estamos renderizando. Y listo! Así de fácil es empezar a usar React.

   Si arrancamos nuestro server y vamos al navegador deberemos ver nuestro mensaje en pantalla de "React-Dojo". Y aunque pareciera poco, citaré a un ~~ilustre~~ personaje en este punto:

   > Lo bueno cuenta y cuenta mucho

## Conclusión

Con lo visto anteriormente ya podemos empezar a darnos una idea de cómo es que React funciona y además sabemos bien cómo utilizar el proceso de webpack para mejorar nuestro empaquetado.

En laboratorios posteriores empezaremos a crear componentes más sofisticados con React y a usar otras herramientas que nos ayudarán a ver el potencial de esta herramienta.
