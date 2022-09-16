import {DataTodolistType, instance} from "../api/api";


export type DataUserType = {
    id: number
    email: string,
    login: string
}

export type LoginDataType = {
    email: string
    password: string
    rememberMe: boolean
}

export const authAPI = {
    me() {
        return instance.get<DataTodolistType<DataUserType>>('/auth/me')
    },
    login(loginData: LoginDataType) {
        return instance.post<DataTodolistType<{ userId: number }>>('/auth/login', loginData)
    },
    logout(loginData: LoginDataType) {
        return instance.delete<DataTodolistType<{ userId: number }>>('/auth/login', loginData)
    },

}

// CRUD

// GET - Read
// ==============
// DELETE - Delete

// POST - Create
// PUT -  Update