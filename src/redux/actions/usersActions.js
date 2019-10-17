import { SET_USERS } from "./actionTypes";

export const setUsers = users => ({
  type: SET_USERS,
  payload: { data: users }
});
