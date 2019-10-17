# React Hooks

En el laboratorio anterior aprendimos a crear componentes con React de 3 maneras distintas, una de ellas nos permitía crear un componente stateful y los otros 2, componentes stateless. Con React Hooks, ya no hay distinción. Aún cuando usemos funciones o arrow functions para crear componentes estos podrán tener un estado.

En este laboratorio veremos cómo hacer uso de react hooks y porque es mejor usarlos en lugar de crear componentes a partir de clases.

Partiremos a partir del proyecto generado en el laboratorio 2 (react-components). Si no cuentan con el laboratorio, se puede clonar el proyecto y avanzar al commit marcado como **Laboratorio 2 completo**. A partir de este punto iniciaremos este laboratorio:

```
git checkout fa50778ecf0
```

## Pre-requisitos

- Laboratorio 2

## Instrucciones

### Haciendo uso del estado en un componente funcional

React tiene un excelente performance dado que guarda en memoria una copia del DOM y renderiza los elementos necesarios cuando es necesario. Para renderizar de nuevo un componente se hacía uso de la función setState en un componente de React que fue creado como clase. Con React hooks ahora podemos hacer lo mismo haciendo uso del **State Hook** el cual nos permitirá modificar el estado de nuestro componente y renderizar de nuevo nuestro componente

1. Abriremos nuestro archivo _UsersPage.js_ y modificaremos el siguiente import:

   ```
   import React from "react";
   ```

   para que también agregué la función **useState**:

   ```
   import React, { useState } from "react";
   ```

2. Ahora haremos uso de la función **useState** al usarla en lugar de la constante users. Borraremos nuestra constante de users y la reemplazaremos con la siguiente línea:

   ```
   let [users, setUsers] = useState([]);
   ```

   Lo que estamos haciendo con esta línea es lo siguiente:

   - Creamos el atributo **users** en el estado de React y lo inicializamos con un valor de **[]**
   - Regresamos la variable que tendrá el valor del estado: **users**
   - Regresamos una función que nos permitirá actualizar el estado: **useState** y en consecuencia volverá a llamar a la función **render**

3. Ahora pondremos un timeout para llenar con información la variable **users**. Esto lo haremos agregando el siguiente bloque de código, justo después de la declaración de nuestra variable de estado:

   ```
    setTimeout(() => {
        setUsers([
            { id: 1, firstName: "John", lastName: "Doe", phoneNumber: "12345678" },
            { id: 2, firstName: "Jane", lastName: "Doe", phoneNumber: "12345679" }
        ]);
    }, 3000);
   ```

   Si ahora visitamos nuestra página, veremos que al cargar se muestra la lista vacía, pero pasando 3 segundos, aparecen nuestros 2 usuarios: John y Jane Doe.

### Eliminando usuarios

Ahora que ya tenemos guardados en nuestro estado los usuarios de nuestra aplicación, agregaremos la funcionalidad necesaria para eliminar usuarios y actualizarlos en el estado, para que esto desencadene la llamada a render. Para ayudarnos a gestionar el arreglo de usuarios haremos uso de una librería llamada lodash.

1. Instalaremos la librería de lodash

   ```
   npm install lodash
   ```

2. Definiremos la lógica de borrado en una función dentro de UsersPage. Para esto haremos un import de la función **remove** de **lodash** y crearemos la función **onDeleteUser** debajo de nuestro setTimeout:

   ```
   import { remove } from "lodash";
   ```

   ```
    ...
   const onDeleteUser = user => {
        let usersCopy = [...users];
        remove(usersCopy, u => u.id === user.id);
        setUsers(usersCopy);
   };
   ```

3. Enviaremos la función onDeleteUser como prop de UsersList:

   ```
    <UsersList users={users} onDeleteUser={onDeleteUser} />
   ```

4. Ahora iremos al archivo UsersList y llamaremos a la función de **onDeleteUser** cuando presionemos el botón de Eliminar. El botón nos quedará de la siguiente manera:

   ```
   <button
     type="button"
     className="btn btn-link"
     onClick={() => props.onDeleteUser(user)}
   >
        Eliminar
   </button>
   ```

   Esto nos generará un warning pues **onDeleteUser** no es parte de propTypes.

5. Agregaremos la validación de **onDeleteUser** en PropTypes:

   ```
   UsersList.propTypes = {
       users: PropTypes.array.isRequired,
       onDeleteUser: PropTypes.func.isRequired
   };
   ```

   Si ahora visitamos nuestra página veremos que podemos borrar el usuario seleccionado, pero pasados un par de segundos vuelven a aparecer ambos usuarios. Ya explicaremos el porque y corregiremos esto en la siguiente sección

### Usando el Effect Hook

Como mencionabamos antes, ya podemos borrar usuarios pero un comportamiento extraño surge al hacerlo. Pasados un par de segundos, los usuarios vuelven a aparecer. La razón es que al actualizar el estado con el State Hook, se vuelve a llamar al método **render** y este llama a setTimeout el cual vuelve a resetear a los usuarios. En un componente stateful creado con una clase, llamariamos al método que inicializa a los usuarios en el método componentDidMount para que se ejecute sólo al montar el componente.

En un componente funcional haremos uso del Effect Hook para replicar este comportamiento.

1. Importaremos en el archivo _UsersPage.js_ el método useEffect, junto con React y useState:

   ```
   import React, { useState, useEffect } from "react";
   ```

2. Reemplazaremos la llamada del setTimeout:

   ```
   setTimeout(() => {
       setUsers([
           { id: 1, firstName: "John", lastName: "Doe", phoneNumber: "12345678" },
           { id: 2, firstName: "Jane", lastName: "Doe", phoneNumber: "12345679" }
       ]);
   }, 3000);
   ```

   por la llamada de useEffect:

   ```
    useEffect(() => {
        setUsers([
            { id: 1, firstName: "John", lastName: "Doe", phoneNumber: "12345678" },
            { id: 2, firstName: "Jane", lastName: "Doe", phoneNumber: "12345679" }
        ]);
    }, []);
   ```

   El primer parametro de useEffect es la función que se ejecutará. El segundo parametro es un arreglo vacío, con esto simularemos el método componentDidMount en componentes stateful creados con clase.

   Si ahora vamos a nuestra página podremos ver que los usuarios se cargan desde el inicio y si los borramos, estos ya no regresan (al menos hasta recargar la página nuevamente).

### Crear el formulario para agregar usuarios

Con lo visto hasta el momento, crearemos un nuevo componente para agregar usuarios. Haremos uso de ambos hooks vistos y recibiremos la lógica desde el container (**UsersPage**)

1. Crearemos dentro de la carpeta _users_ una nueva carpeta llamada _EditUser_, y dentro de esta nueva carpeta crearemos un archivo llamado _EditUser.js_. Lo llamamos así pues después este mismo componente nos servirá para actualizar los usuarios también.

2. Dentro del archivo _EditUser.js_ definiremos nuestro componente de la siguiente manera:

   ```
   import React from "react";

   const EditUser = () => {
    return (
        <div>
            <form>
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" className="form-control" id="firstName" />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" className="form-control" id="lastName" />
                </div>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input type="text" className="form-control" id="phoneNumber" />
                </div>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
   };

   export default EditUser;
   ```

3. Ahora editaremos el archivo _UsersPage.js_ y agregamos una nueva variable haciendo uso del State hook:

   ```
   let [addUser, setAddUser] = useState(false);
   ```

   Esta variable nos ayudará a saber si tenemos que renderizar la lista de usuarios o el formulario para agregar/editar usuarios.

4. Importamos nuestro componente **EditUser** dentro de **UsersPage**:

   ```
   import EditUser from "./EditUser/EditUser";
   ```

5. Agregamos una validación para saber que componente pintar en pantalla, si la variable **adUser** es true, pintaremos **EditUser**, en caso contrario será **UsersList**:

   ```
   {addUser ? (
     <EditUser />
   ) : (
     <UsersList users={users} onDeleteUser={onDeleteUser} />
   )}
   ```

   Por el momento sólo veremos la lista de usuarios, pues la variable **addUser** inicia con el valor de false y nunca se cambia.

6. En el botón **Agregar Usuario** agregaremos la funcionalidad para que al ser presionado, cambie el valor de **addUser** a true y entonces se despliegue el formulario de **EditUser**:

   ```
   <button
     type="button"
     className="btn btn-link"
     onClick={() => setAddUser(true)}
   >
     Agregar Usuario
   </button>
   ```

### Agregar usuarios

Ahora que ya tenemos el formulario creado, pasaremos a configurar el estado del formulario y conectaremos con el componente de **UsersPage**

1. Crearemos la variable **user** en el estado del componente **EditUser**. Para esto primero modificaremos el import de React:

   ```
    import React, { useState } from "react";
   ```

   y luego declararemos la variable:

   ```
    let [user, setUser] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: ""
    });
   ```

   Como podemos observar, nuestra variable user tiene un valor inicial con los campos vacios para sus atributos.

2. Atamos los inputs de **EditUser** a los distintos campos de nuestra variable user:

   ```
    <input
      type="text"
      className="form-control"
      id="firstName"
      value={user.firstName}
    />
   ```

   Esto aplica para los 3 input's con su respectivo atributo relacionado

3. Crearemos la función para gestionar los cambios en los inputs:

   ```
   const onInputChange = event => {
       let userCopy = { ...user, [event.target.id]: event.target.value };
       setUser(userCopy);
   };
   ```

4. Agregamos al evento onChange de nuestros inputs la función que acabamos de crear:

   ```
   <input
     type="text"
     className="form-control"
     id="firstName"
     value={user.firstName}
     onChange={onInputChange}
   />
   ```

   Esto para cada uno de nuestros inputs

5. Creamos una función para el evento onInput del formulario:

   ```
   const onSubmit = event => {
       event.preventDefault();
       props.onSubmit(user);
   };
   ```

   Aquí podemos notar que estamos utilizando la variable props, por lo tanto, tendremos que agregarla al definir el arrow function de nuestro componente:

   ```
    const EditUser = props => {
    ...
   ```

   Ya sólo falta atar la función onSubmit a nuestro formulario:

   ```
    <form onSubmit={onSubmit}>
    ...
   ```

   y agregar el prop onSubmit para que no aparezcan warnings al compilar:

   ```
    import PropTypes from "prop-types";
    ...

    ...
    EditUser.propTypes = {
        onSubmit: PropTypes.func.isRequired
    };

    export default EditUser;
   ```

6. Ahora iremos a nuestro archivo _UsersPage.js_ y definiremos la lógica de onSubmit:

   ```
    const onSubmit = user => {
        let usersCopy = [...users, { ...user, id: Math.floor(Math.random() * 10000) }];
        setUsers(usersCopy);
        setAddUser(false);
    };
   ```

7. Agregaremos la función a los props del componente **EditUser**

   ```
    <EditUser onSubmit={onSubmit} />
   ```

### Editando usuarios

Como último paso, editaremos los usuarios creados haciendo uso de nuestro recién creado componente **EditUser**

1. Primero crearemos en el componente **UsersPage** una variable en el estado llamada selectedUser:

   ```
   let [selectedUser, setSelectedUser] = useState({
       firstName: "",
       lastName: "",
       phoneNumber: ""
   });
   ```

   De inicio tendrá los campos vacios

2. En el componente **UsersPage** enviaremos este selectedUser como prop a nuestro componente **EditUser**:

   ```
   <EditUser onSubmit={onSubmit} user={selectedUser} />
   ```

   y desde EditUser usaremos este prop **selectedUser** para inicializar el estado de la variable user:

   ```
   let [user, setUser] = useState(props.user);
   ```

   No nos olvidemos de agregar este nuevo prop dentro de propTypes en **EditUser**:

   ```
    EditUser.propTypes = {
        onSubmit: PropTypes.func.isRequired,
        user: PropTypes.object.isRequired
    };
   ```

3. En nuestro archivo _UsersPage.js_ definiremos la logica de onEditUser:

   ```
   const onEditUser = user => {
       setSelectedUser(user);
       setAddUser(true);
   };
   ```

   Esta lógica la pondremos como prop al renderizar nuestro componente **UsersList**:

   ```
    <UsersList
          users={users}
          onDeleteUser={onDeleteUser}
          onEditUser={onEditUser}
        />
   ```

4. Ahora iremos a nuestro archivo _UsersList.js_ y ahí ataremos este método al presionar el botón de Editar:

   ```
   <button
      type="button"
      className="btn btn-link"
      onClick={() => props.onEditUser(user)}
    >
      Editar
    </button>
   ```

   No hay que olvidar agregar en el propTypes de UsersList este nuevo atributo:

   ```
    UsersList.propTypes = {
        users: PropTypes.array.isRequired,
        onDeleteUser: PropTypes.func.isRequired,
        onEditUser: PropTypes.func.isRequired
    };
   ```

5. Por último, sólo nos queda modificar la lógica de la función **onSubmit** en nuestro archivo _UsersPage.js_

   ```
    const onSubmit = user => {
        if (user.id) {
            let usersCopy = users.map(u => {
                return u.id === user.id ? user : u;
            });
            setUsers(usersCopy);
            setSelectedUser({
                firstName: "",
                lastName: "",
                phoneNumber: ""
            });
        } else {
            let usersCopy = [...users, { ...user, id: Math.floor(Math.random() * 10000) }];
            setUsers(usersCopy);
        }
        setAddUser(false);
    };
   ```

## Conclusión

En este laboratorio vimos como gestionar la lógica de un componente stateful, haciendo uso de React hooks y avanzamos en la creación de funcionalidades para nuestro administrador de usuarios.
