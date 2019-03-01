import { combineReducers } from "redux";
import savedDataReducer from "./DataPage/savedDataReducer";
import mainPageReducer from "./HomePage/mainPageReducer";
import builderPageReducer from "./BuilderPage/builderPageReducer";

let reducers = combineReducers({
  SavedData: savedDataReducer,
  MainPage: mainPageReducer,
  BuilderPage: builderPageReducer
});

export default reducers;
