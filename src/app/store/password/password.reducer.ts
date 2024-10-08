import {createReducer, on} from "@ngrx/store";
import {passwordState} from "./password.state";
import {generatePassword} from "./password.actions";

export const passwordReducer = createReducer(passwordState, on(generatePassword, (state, {password}) => ({
    ...state,
    password: password
  }))
);
