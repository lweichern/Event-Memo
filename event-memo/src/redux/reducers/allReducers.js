import userReducer from "./userReducer";
import { combineReducers } from "redux";

const allReducer = combineReducers({
  user: userReducer,
});

export default allReducer;
