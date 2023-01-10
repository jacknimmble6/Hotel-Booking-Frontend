import { combineReducers } from "redux";
import { searchReducer } from "./search"
import { PageSearchReducer } from "./pageSearch";
import { SignUpReducer } from "./signUp";
import { UserReducer } from "./user";

export interface AppState {
  search: SearchState,
  pageSearch: PageSearchState,
  signUp: SignUpState,
  user: UserState
}

const reducers = combineReducers({
  search: searchReducer,
  pageSearch: PageSearchReducer,
  signUp: SignUpReducer,
  user: UserReducer
})

export default reducers

export type RootState = ReturnType<typeof reducers>