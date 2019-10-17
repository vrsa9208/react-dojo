import React, { useState, useEffect } from "react";
import UsersList from "./UsersList/UsersList";
import { remove } from "lodash";
import EditUser from "./EditUser/EditUser";
import { connect } from "react-redux";
import { setUsers } from "../../redux/actions/usersActions";
import PropTypes from "prop-types";

function UsersPage(props) {
  let [addUser, setAddUser] = useState(false);
  let [selectedUser, setSelectedUser] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: ""
  });

  useEffect(() => {
    props.setUsers([
      { id: 1, firstName: "John", lastName: "Doe", phoneNumber: "12345678" },
      { id: 2, firstName: "Jane", lastName: "Doe", phoneNumber: "12345679" }
    ]);
  }, []);

  const onDeleteUser = user => {
    let usersCopy = [...props.users];
    remove(usersCopy, u => u.id === user.id);
    props.setUsers(usersCopy);
  };

  const onEditUser = user => {
    setSelectedUser(user);
    setAddUser(true);
  };

  const onSubmit = user => {
    if (user.id) {
      let usersCopy = props.users.map(u => {
        return u.id === user.id ? user : u;
      });
      props.setUsers(usersCopy);
      setSelectedUser({
        firstName: "",
        lastName: "",
        phoneNumber: ""
      });
    } else {
      let usersCopy = [
        ...props.users,
        { ...user, id: Math.floor(Math.random() * 10000) }
      ];
      props.setUsers(usersCopy);
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
          users={props.users}
          onDeleteUser={onDeleteUser}
          onEditUser={onEditUser}
        />
      )}
    </div>
  );
}

UsersPage.propTypes = {
  users: PropTypes.array.isRequired,
  setUsers: PropTypes.func.isRequired
};

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
