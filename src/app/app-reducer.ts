import {authAPI, LoginDataType} from "./auth-api";
import {AxiosError} from "axios";

const initialState = {
    isLoading: false,
    isLogIn: false
}

export type AppStateType = typeof initialState
export type AppActionType =
    | SetLoadingAT
    | SetLogInAT
    | SetLogOutAT

export type SetLoadingAT = ReturnType<typeof setLoadingAC>
export type SetLogInAT = ReturnType<typeof setLogInAC>
export type SetLogOutAT = ReturnType<typeof setLogOutAC>

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
        case "APP/SET-LOG-OUT":
            return {
                ...state,
                // isLogIn: action.isLogIn
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

export const setLogOutAC = (isLogIn: boolean) => ({
    type: 'APP/SET-LOG-OUT',
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

export const loginTC = (values: LoginDataType) => {
    return (dispatch: any) => {
        authAPI.login(values)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(setLogInAC(true))
                } else {
                    alert(res.data.messages)
                }
            })
            .catch((e: AxiosError) => {
                alert(e.message)
            })

    }
}

export const logoutTC = (values: LoginDataType) => {
    return (dispatch: any) => {
        authAPI.login(values)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(setLogOutAC(false))
                } else {
                    alert(res.data.messages)
                }
            })
            .catch((e: AxiosError) => {
                alert(e.message)
            })

    }
}
