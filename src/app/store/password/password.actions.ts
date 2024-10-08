import {createAction, props} from "@ngrx/store";


export const generatePassword = createAction('[Password] generate password',   props<{ password: string }>() )


