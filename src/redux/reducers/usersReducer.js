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
