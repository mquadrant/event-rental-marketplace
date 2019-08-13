import userReducer from "./user/userReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  user: userReducer
});

export default rootReducer;
