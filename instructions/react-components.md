# React Components

En este laboratorio vamos a crear distintos componentes con React y aterrizaremos los conceptos básicos para entender el funcionamiento de los componentes stateless y stateful en React.

Partiremos a partir del proyecto generado en el laboratorio 1 (react-project-from-scratch). Si no cuentan con el laboratorio, se puede clonar el proyecto y avanzar al commit marcado como **Laboratorio 1 completo**. A partir de este punto iniciaremos este laboratorio:

```
git checkout c924bb43
```

## Pre-requisitos

- Laboratorio 1

## Herramientas útiles

Estas extensiones NO son necesarias, pero considerando mi experiencia te puedo asegurar que te ahorrarán valiosos segundos y te ayudarán a desarrollar de una manera más sencilla.

- Extensiones Chrome

  - React Developer Tools

## Instrucciones

### Creando nuestro primer componente en React

En realidad esto no es completamente cierto, dado que en el último laboratorio ya habíamos creado nuestro primer componente llamado **App**. En esta sección lo que haremos es independizar el componente del archivo de entrada de la aplicación (_index.js_) y transformarlo para que pase a ser un componente stateful.

1. Como primer paso crearemos una carpeta específica para guardar los componentes que crearemos a partir de ahora. Esta se llamará _components_ y estará alojada en la carpeta _src_. Considerando que estamos posicionados en la carpeta raíz en consola, podemos hacer lo siguiente:

   ```
   cd src && mkdir components && cd $_
   ```

   Una vez dentro de la carpeta de _components_ crearemos un archivo llamado _App.js_. Ahora bien, si instalamos la extensión de Visual Studio **ES7 React/Redux/GraphQL/React-Native snippets** podemos escribir en el archivo rcc (**r**eact **c**lass **c**omponent) y la extensión generará por nosotros la estructura básica de un componente de React stateful. Si no es así, podemos tomar el siguiente bloque de código y pegarlo dentro del archivo:

   ```
    import React, { Component } from "react";

    export default class App extends Component {
    render() {
        return <div>App Component</div>;
    }
    }
   ```

   Como podemos notar, tenemos una clase que cuenta con el método **render**. Es este método el que nos regresará el cuerpo del componente.

2. Ahora iremos al archivo _index.js_ y ahí eliminaremos el antiguo componente funcional **App**

   ```
   function App() {
       return <div>React-Dojo</div>;
   }
   ```

3. Importaremos dentro del mismo archivo nuestro recién creado componente **App** con la siguiente sentencia, en la sección de imports:

   ```
   import App from "./components/App";
   ```

   Después de haber hecho esto, podemos arrancar nuestra aplicación y veremos que la aplicación compila sin errores y al verla en nuestro navegador deberemos observar el mensaje de "App Component".

### Agregando estilos al proyecto (Bootstrap)

En el laboratorio anterior, preparamos nuestro proyecto para importar archivos de estílo. Ahora agregaremos una librería que nos ayudará a maquetar y dar estilo de manera más sencilla a nuestros componentes. Esta es **Bootstrap** y los pasos para que nuestros componentes puedan utilizarla son los siguientes:

1. Instalamos la dependencia necesaria. Estando en la carpeta raíz en consola, vamos a ejecutar el siguiente comando:

   ```
   npm install bootstrap
   ```

2. Una vez instalada la librería iremos a nuestro archivo _index.js_ y ahí importaremos el archivo css de bootstrap con la siguiente sentencia import:

   ```
    import "bootstrap/dist/css/bootstrap.min.css";
   ```

   Con esto será suficiente, por el momento, para hacer uso de los estilos de bootstrap y de sus clases.

### Creando la página de usuarios

1. Ahora que hemos creado el componente **App**, crearemos un componente llamado **UsersPage**. A diferencia de **App** este vivirá en una carpeta propia dentro de components llamada _users_ y será un componente funcional. Creamos la carpeta _users_ dentro de la carpeta components y dentro de _users_ crearemos el archivo _UsersPage.js_

2. **UsersPage** será un componente funcional, lo cual significa que en lugar de ser definido con una clase, usará una función. El atajo para crear este tipo de componentes es rfc (**r**eact **f**unction **c**) si tenemos instalada la extensión de snippets de react. Si no es así, el código que tendrá el archivo _UsersPage.js_ será el siguiente:

   ```
    import React from "react";

    export default function UsersPage() {
        return <div>Users Page</div>;
    }
   ```

   Otro punto a notar aquí es que este es un componente "stateless". Esto fue así hasta la introducción de React Hooks, los cuales veremos en un laboratorio posterior.

3. Dentro de nuestro archivo _App.js_ reemplazaremos la siguiente línea:

   ```
   return <div className="container">App Component</div>;
   ```

   por la siguiente:

   ```
   return <UsersPage />;
   ```

   Y también necesitaremos agregar el import adecuado en _App.js_:

   ```
    import UsersPage from "./users/UsersPage";
   ```

   Si lanzamos en este momento nuestra aplicación y vamos al navegador, deberemos ver el mensaje de "Users Page".

4. Por el momento nuestro componente **UsersPage** tiene una pinta muy sencilla, así que vamos a agregar algunos elementos y clases para darle más presentación. Vamos a reemplazar la siguiente línea:

   ```
   return <div>Users Page</div>;
   ```

   por el siguiente bloque de código, más elaborado:

   ```
    return (
        <div className="container">
        <h1>Users Page</h1>
        <div>
            <button type="button" className="btn btn-link">
            Agregar Usuario
            </button>
        </div>
        <table className="table">
            <thead className="thead-dark">
            <tr>
                <th scope="col">#</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <th scope="row">1</th>
                <td>John</td>
                <td>Doe</td>
                <td>55-12-34-56-78</td>
                <td>
                <button type="button" className="btn btn-link">
                    Editar
                </button>
                <button type="button" className="btn btn-link">
                    Eliminar
                </button>
                </td>
            </tr>
            <tr>
                <th scope="row">2</th>
                <td>Jane</td>
                <td>Doe</td>
                <td>55-12-34-56-79</td>
                <td>
                <button type="button" className="btn btn-link">
                    Editar
                </button>
                <button type="button" className="btn btn-link">
                    Eliminar
                </button>
                </td>
            </tr>
            </tbody>
        </table>
        </div>
    );
   ```

   Lo que podemos notar aquí es que ya estamos haciendo uso de las clases de bootstrap y que en lugar de usar **class** hacemos uso de **className**.

### Creando un componente stateless con un arrow function

Nuestro componente **UsersPage** funciona de maravilla hasta el momento, pero es un componente estático, además que tiene incluída mucha información. Para mejorarlo, separaremos la lista de usuarios en un nuevo componente y haremos uso de las propiedades del componente para enviarle los usuarios a desplegar.

1.  Dentro de la carpeta _users_ crearemos una nueva carpeta llamada _UsersList_. Dentro de esta vamos a crear un archivo llamado UsersList.js. Este archivo contendrá un componente funcional. La única diferencia con **UsersPage** es que en lugar de ser definido con una función normal, usaremos un Arrow Function.

    Como en componentes anteriores, podemos usar el atajo **rafc** (**r**eact **a**rrow **f**unction **c**omponent) o bien pegar el siguiente segmento de código:

    ```
     import React from "react";

     const UsersList = () => {
         return <div>Users List Component</div>;
     };

     export default UsersList;
    ```

2.  Modificaremos el contenido que regresa nuestra función por la tabla que tenemos en el componente **UsersPage**:

    ```
    <table className="table">
        <thead className="thead-dark">
        <tr>
            <th scope="col">#</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <th scope="row">1</th>
            <td>John</td>
            <td>Doe</td>
            <td>55-12-34-56-78</td>
            <td>
            <button type="button" className="btn btn-link">
                Editar
            </button>
            <button type="button" className="btn btn-link">
                Eliminar
            </button>
            </td>
        </tr>
        <tr>
            <th scope="row">2</th>
            <td>Jane</td>
            <td>Doe</td>
            <td>55-12-34-56-79</td>
            <td>
            <button type="button" className="btn btn-link">
                Editar
            </button>
            <button type="button" className="btn btn-link">
                Eliminar
            </button>
            </td>
        </tr>
        </tbody>
    </table>
    ```

3.  Ahora reemplazaremos el segmento de la tabla en **UsersPage** por una llamada a nuestro componente. Nuestro componente **UsersPage** quedará de la siguiente manera:

    ```
     import React from "react";
     import UsersList from "./UsersList/UsersList";

     export default function UsersPage() {
     return (
         <div className="container">
         <h1>Users Page</h1>
         <div>
             <button type="button" className="btn btn-link">
                 Agregar Usuario
             </button>
         </div>
         <UsersList />
         </div>
     );
     }
    ```

4.  Sin embargo, uno de los objetivos del componente **UsersList** es modularizarlo y que su información sea dinámica. Lo que haremos entonces es modificar los datos de usuarios y pintarlos de acuerdo a sus propiedades. Lo primero será cambiar los parametros de nuestra Arrow Function y recibir el objeto props.

    Reemplazaremos la siguiente línea:

    ```
    const UsersList = () => {
    ```

    por esta:

    ```
    const UsersList = props => {
    ```

    De esta manera tendremos acceso a los datos enviados al instanciar el componente.

5.  Haciendo uso de la función map, pintaremos los usuarios de manera dinámica. Reemplazaremos el siguiente bloque de código en _UsersLists.js_:

    ```
    <tbody>
        <tr>
        <th scope="row">1</th>
        <td>John</td>
        <td>Doe</td>
        <td>55-12-34-56-78</td>
        <td>
            <button type="button" className="btn btn-link">
            Editar
            </button>
            <button type="button" className="btn btn-link">
            Eliminar
            </button>
        </td>
        </tr>
        <tr>
        <th scope="row">2</th>
        <td>Jane</td>
        <td>Doe</td>
        <td>55-12-34-56-79</td>
        <td>
            <button type="button" className="btn btn-link">
            Editar
            </button>
            <button type="button" className="btn btn-link">
            Eliminar
            </button>
        </td>
        </tr>
    </tbody>
    ```

    por el siguiente bloque:

    ```
    <tbody>
      {props.users &&
        props.users.map(user => (
          <tr key={user.id}>
            <th scope="row">{user.id}</th>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.phoneNumber}</td>
            <td>
              <button type="button" className="btn btn-link">
                Editar
              </button>
              <button type="button" className="btn btn-link">
                Eliminar
              </button>
            </td>
          </tr>
        ))}
    </tbody>
    ```

    Si ahora vemos nuestra página, notaremos que sólo hay una tabla vacía y que compilo con 3 warnings (Esto lo resolveremos más adelante).

6.  Ahora le enviaremos la lista de usuarios a nuestro componente **UsersList** desde **UsersPage**. Para esto declararemos el siguiente arreglo en _UsersPage.js_:

    ```
    const users = [
        { id: 1, firstName: "John", lastName: "Doe", phoneNumber: "12345678" },
        { id: 2, firstName: "Jane", lastName: "Doe", phoneNumber: "12345679" }
    ];
    ```

    Esté irá declarado justo antes de la llamada a **return**

    Y agregaremos el siguiente atributo a nuestro componente UsersList:

    ```
    <UsersList users={users} />
    ```

    Si visitamos la página ahora, veremos de nuevo nuestra tabla con los dos usuarios que hemos enviado dentro de los props de **UsersList**.

### Validando los props de un componente

En la sección anterior, logramos mostrar nuestros usuarios en pantalla, pero al compilar, se nos mostraron algunos warnings. Estos son mostrados dado que no sabemos si los atributos que buscamos vendrán dentro de nuestros props. Una manera sencilla de hacer esta validación es haciendo uso de prop-types.

1. Nuestro primer paso será instalar la dependencia de prop-types:

   ```
   npm install prop-types
   ```

2. Ahora iremos a nuestro archivo _UsersList.js_ y haremos los siguientes cambios:

   Primero importaremos el objeto de PropTypes:

   ```
   import PropTypes from "prop-types";
   ```

   Una vez que ya tenemos el import de PropTypes, agregaremos el siguiente bloque de código, antes de hacer el export de nuestra función:

   ```
    UsersList.propTypes = {
        users: PropTypes.array.isRequired
    };
   ```

   Si ahora volvemos a compilar nuestro proyecto veremos que ya no tenemos más warnings. Así mismo, si no llegaramos a poner el atributo users al usar el componente **UsersList** se desplegará un mensaje en consola (navegador) que nos informará de que este atributo es necesario.

## Conclusión

En este laboratorio vimos 3 maneras distintas de crear un componente de React:

- Class Component
- Functional Component
- Arrow Function Component

Así mismo, usamos los props de un componente y vimos la manera de validar estos props con PropTypes. En el siguiente laboratorio entenderemos un poco más acerca del flujo de un componente y de su estado. Y como es que este afecta al renderizar el componente.
