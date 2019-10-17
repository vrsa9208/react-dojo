import React, { useState } from "react";
import PropTypes from "prop-types";

const EditUser = props => {
  let [user, setUser] = useState(props.user);

  const onInputChange = event => {
    let userCopy = { ...user, [event.target.id]: event.target.value };
    setUser(userCopy);
  };

  const onSubmit = event => {
    event.preventDefault();
    props.onSubmit(user);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            value={user.firstName}
            onChange={onInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            value={user.lastName}
            onChange={onInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text"
            className="form-control"
            id="phoneNumber"
            value={user.phoneNumber}
            onChange={onInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

EditUser.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

export default EditUser;
