import React from "react";
import UsersList from "./UsersList/UsersList";

export default function UsersPage() {
  const users = [
    { id: 1, firstName: "John", lastName: "Doe", phoneNumber: "12345678" },
    { id: 2, firstName: "Jane", lastName: "Doe", phoneNumber: "12345679" }
  ];

  return (
    <div className="container">
      <h1>Users Page</h1>
      <div>
        <button type="button" className="btn btn-link">
          Agregar Usuario
        </button>
      </div>
      <UsersList users={users} />
    </div>
  );
}
