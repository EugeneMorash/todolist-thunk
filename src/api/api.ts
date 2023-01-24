import axios from "axios";


export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'API-KEY': 'e28acb4d-f73d-425b-987a-dfa47f45b3ae'
    }
})


export type DataTodolistType<T = {}> = {
    data: T
    resultCode: number,
    fieldsErrors: string[]
    messages: string[]
}