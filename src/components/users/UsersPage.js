import React, { useState, useEffect } from "react";
import UsersList from "./UsersList/UsersList";
import { remove } from "lodash";
import EditUser from "./EditUser/EditUser";

export default function UsersPage() {
  let [users, setUsers] = useState([]);
  let [addUser, setAddUser] = useState(false);
  let [selectedUser, setSelectedUser] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: ""
  });

  useEffect(() => {
    setUsers([
      { id: 1, firstName: "John", lastName: "Doe", phoneNumber: "12345678" },
      { id: 2, firstName: "Jane", lastName: "Doe", phoneNumber: "12345679" }
    ]);
  }, []);

  const onDeleteUser = user => {
    let usersCopy = [...users];
    remove(usersCopy, u => u.id === user.id);
    setUsers(usersCopy);
  };

  const onEditUser = user => {
    setSelectedUser(user);
    setAddUser(true);
  };

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
      let usersCopy = [
        ...users,
        { ...user, id: Math.floor(Math.random() * 10000) }
      ];
      setUsers(usersCopy);
    }
    setAddUser(false);
  };

  return (
    <div className="container">
      <h1>Users Page</h1>
      <div>
        <button
          type="button"
          className="btn btn-link"
          onClick={() => setAddUser(true)}
        >
          Agregar Usuario
        </button>
      </div>
      {addUser ? (
        <EditUser onSubmit={onSubmit} user={selectedUser} />
      ) : (
        <UsersList
          users={users}
          onDeleteUser={onDeleteUser}
          onEditUser={onEditUser}
        />
      )}
    </div>
  );
}
