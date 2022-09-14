import {DataTodolistType, instance} from "../api/api";


export type DataUserType = {
    id: number
    email: string,
    login: string
}


export const authAPI = {
    me() {
        return instance.get<DataTodolistType<DataUserType>>('/auth/me')
    },
}