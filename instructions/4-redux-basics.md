# React Components

En el laboratorio anterior trabajamos con React Hooks para administrar un grupo de usuarios almacenados en el state de React. Una opción distinta para administrar el estado es Redux. Este nos permite gestionar el estado a traves de un flujo unidireccional que nos permitirá un mayor nivel de control sobre este proceso.

Partiremos a partir del proyecto generado en el laboratorio 3 (react-hooks). Si no cuentan con el laboratorio, se puede clonar el proyecto y avanzar al commit marcado como **Laboratorio 3 completo**. A partir de este punto iniciaremos este laboratorio:

```
git checkout e43ce4aa9590
```

## Pre-requisitos

- Laboratorio 3

## Herramientas útiles

Estas extensiones NO son necesarias, pero considerando mi experiencia te puedo asegurar que te ahorrarán valiosos segundos y te ayudarán a desarrollar de una manera más sencilla.

- Extensiones Chrome

  - Redux DevTools

## Instrucciones

### Creando nuestro Store

El primer paso para configurar Redux en nuestro proyecto será crear nuestro store. Este es el medio de almacenamiento que utiliza redux para el estado. En este segmento configuraremos el store e instalaremos algunas herramientas extra que nos serán de utilidad.

1. Como primer paso instalaremos las dependencias que utilizaremos para configurar el store de Redux:

   ```
   npm install redux redux-immutable-state-invariant
   ```

2. Crearemos una carpeta llamada _redux_ en la carpeta _src_. Dentro de esta nueva carpeta crearemos el archivo _configureStore.js_, el cual tendrá el siguiente código:

   ```
    import { createStore, applyMiddleware, compose } from "redux";
    import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
    import rootReducer from "./reducers/rootReducer";

    export default function configureStore(initialState) {
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //Configuración para usar Redux dev tools
    return createStore(
        rootReducer,
        initialState,
        composeEnhancers(applyMiddleware(reduxImmutableStateInvariant()))
    );
    }
   ```

   ESLint nos indicará un error dado que no encuentra rootReducer. Esto es normal, en el siguiente paso agregaremos nuestro rootReducer.

### Creando el Root Reducer

Ahora que ya contamos con nuestro store, crearemos nuestro rootReducer. Un reducer es el mecanismo a través del cual, nuestro estado irá cambiando. Un reducer no es mas que una función que recibe el estado actual y una acción y a partir de estos, nos entrega un nuevo estado.

1. Dentro de la carpeta _redux_ crearemos una nueva carpeta llamada _reducers_ y dentro de esta nueva carpeta crearemos un archivo llamado _rootReducer.js_. El contenido de este archivo será el siguiente:

   ```
    import { combineReducers } from "redux";
    import usersReducer from "./usersReducer";

    const rootReducer = combineReducers({
    users: usersReducer
    });

    export default rootReducer;
   ```

   Al igual que en el paso anterior, aún no contamos con el archivo usersReducer, pero lo crearemos en el siguiente paso

2. Ahora crearemos dentro de la carpeta _reducers_ nuestro archivo _usersReducer.js_, el cual tendrá el siguiente código:

   ```
    const initialState = {
        data: []
    };

    export default (state = initialState, { type, payload }) => {
        switch (type) {
            case "SET_USERS":
                return { ...state, ...payload };

            default:
                return state;
        }
    };
   ```

### Creando Actions

Una manera de mejorar la forma de trabajo con Redux es creando Action creators, estos nos permiten crear acciones válidas que después serán utilizadas por el método dispatch para actualizar nuestro estado

1. Creamos dentro de la carpeta de _redux_ una nueva carpeta llamada _actions_ y dentro de esta nueva carpeta creamos un archivo llamado _actionTypes.js_, con el siguiente contenido:

   ```
   export const SET_USERS = "SET_USERS";
   ```

2. Esta constante la usaremos, en lugar de la cadena "SETUSERS" en nuestro archivo _usersReducer.js_, el cual quedará de la siguiente manera:

   ```
   import { SET_USERS } from "../actions/actionTypes";

    const initialState = {
        data: []
    };

   export default (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_USERS:
            return { ...state, ...payload };

        default:
            return state;
    }
   };
   ```

3. Ahora crearemos en la carpeta _actions_ un archivo llamado _usersActions.js_ que tendrá el siguiente contenido:

   ```
    import { SET_USERS } from "./actionTypes";

    export const setUsers = users => ({
        type: SET_USERS,
        payload: { data: users }
    });
   ```

### Creando nuestro store y conectando a App

Ya tenemos el mecanismo para crear nuestro store y empezar a ocupar Redux, pero nos hace falta conectarlo a nuestra aplicación, para esto seguiremos los siguientes pasos:

1. Instalar la dependencia de react-redux:

   ```
   npm install react-redux
   ```

2. Ahora iremos a nuestro archivo _index.js_ y ahí modificaremos el código para que quede de la siguiente manera:

   ```
    import React from "react";
    import { render } from "react-dom";
    import App from "./components/App";
    import "bootstrap/dist/css/bootstrap.min.css";
    import { Provider } from "react-redux";
    import configureStore from "./redux/configureStore";

    const store = configureStore();

    render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("app")
    );

   ```

   El uso de Provider nos permitirá hacer uso de nuestro recién creado Store desde cualquier componente que se encuentre dentro de **App**

### Leyendo el store desde UsersPage

La manera de alcanzar el store en un componente que existe bajo el componente App es a través de la función connect. En los siguientes pasos veremos cómo.

1. Abriremos el archivo _UsersPage.js_ y cambiaremos el export del inicio del archivo para que quedé de la siguiente manera:

   Esta línea:

   ```
   export default function UsersPage() {
   ```

   la cambiaremos por:

   ```
    function UsersPage(props) {
   ```

   y al final del archivo agregaremos:

   ```
   export default UsersPage;
   ```

2. Ahora importaremos la función connect en el archivo _UsersPage.js_:

   ```
    import { connect } from "react-redux";
   ```

   y cambiaremos la última línea (export default UsersPage) por:

   ```
    const mapStateToProps = state => {
        return {
            users: state.users.data
        };
    };

    const mapDispatchToProps = {
        setUsers
    };

    export default connect(
        mapStateToProps,
        mapDispatchToProps
    )(UsersPage);
   ```

   Para que esto pueda correr, necesitaremos agregar el siguiente import:

   ```
    import { setUsers } from "../../redux/actions/usersActions";
   ```

3. Ahora eliminaremos la variable users y setUsers de nuestro componente **UsersPage**:

   ~~let [users, setUsers] = useState([]);~~

4. Reemplazaremos dentro de _UsersPage.js_ las llamadas a users por props.users y setUsers por props.setUsers

   Esto hará que el compilador nos lanze algunos warnings, pero configurando los propTypes, como ya vimos en pasos anteriores nos ayudará a eliminarlos:

   ```
    import PropTypes from "prop-types";
    ...

    ...
    UsersPage.propTypes = {
        users: PropTypes.array.isRequired,
        setUsers: PropTypes.func.isRequired
    };
   ```

## Conclusión

Siguiendo estos pasos tendremos configurado y funcionando Redux en nuestro proyecto. Este es, al momento, una mezcla que usa el estado de React, pero también está preparado para trabajar con Redux. En un siguiente laboratorio veremos cómo es que podemos hacer operaciones asincronas con Redux y Redux-thunks
