import {authAPI} from "./auth-api";
import {AxiosError} from "axios";

const initialState = {
    isLoading: false,
    isLogIn: false
}

export type AppStateType = typeof initialState
export type AppActionType =
    | SetLoadingAT
    | SetLogInAT

export type SetLoadingAT = ReturnType<typeof setLoadingAC>
export type SetLogInAT = ReturnType<typeof setLogInAC>

export const appReducer = (state: AppStateType = initialState, action: AppActionType): AppStateType => {
    switch (action.type) {
        case "APP/SET-LOADING":
            return {
                ...state,
                isLoading: action.isLoading
            }
        case "APP/SET-LOG-IN":
            return {
                ...state,
                isLogIn: action.isLogIn
            }

        default:
            return state
    }
}


export const setLoadingAC = (isLoading: boolean) => ({
    type: 'APP/SET-LOADING',
    isLoading
}) as const

export const setLogInAC = (isLogIn: boolean) => ({
    type: 'APP/SET-LOG-IN',
    isLogIn
}) as const


// * thunk

export const isAuthMeTC = () => {
    return (dispatch: any) => {
        authAPI.me()
            .then((res) => {
                dispatch(setLogInAC(res.data.resultCode === 0))
            })
            .catch((e: AxiosError) => {
                alert(e.message)
            })
    }
}
