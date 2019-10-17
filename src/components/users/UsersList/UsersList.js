import React from "react";
import PropTypes from "prop-types";

const UsersList = props => {
  return (
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
        {props.users &&
          props.users.map(user => (
            <tr key={user.id}>
              <th scope="row">{user.id}</th>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.phoneNumber}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-link"
                  onClick={() => props.onEditUser(user)}
                >
                  Editar
                </button>
                <button
                  type="button"
                  className="btn btn-link"
                  onClick={() => props.onDeleteUser(user)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

UsersList.propTypes = {
  users: PropTypes.array.isRequired,
  onDeleteUser: PropTypes.func.isRequired,
  onEditUser: PropTypes.func.isRequired
};

export default UsersList;
