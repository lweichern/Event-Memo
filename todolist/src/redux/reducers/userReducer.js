import { actionTypes } from "../actions/actionTypes";

const INITIAL_STATE = {
  loginUser: "",
  isLoggedIn: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_USER:
      return {
        loginUser: action.payload,
        isLoggedIn: true,
      };

    case actionTypes.LOGOUT_USER:
      return {
        loginUser: "",
        isLoggedIn: false,
      };

    default:
      return state;
  }
};

export default userReducer;
