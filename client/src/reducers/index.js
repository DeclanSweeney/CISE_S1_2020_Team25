import { combineReducers } from "redux";
import itemReducer from "./itemReducer";
import articleReducer from "./articleReducer";

export default combineReducers({
  item: itemReducer,
  article: articleReducer,
});
