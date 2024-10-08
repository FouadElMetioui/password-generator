import {Password} from "./password.model";
import {createSelector} from "@ngrx/store";

interface AppState {
  password:Password

}
export const trackPassword = (state : AppState) => state.password ;

export const selectPassword  = createSelector(trackPassword , (state) => state.password)

