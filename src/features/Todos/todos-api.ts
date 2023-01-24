import {DataTodolistType, instance} from "../../api/api";

export type ResTodosType = {
    id: string
    addedDate: string
    order: number
    title: string
}


export const todosAPI = {
    getTodos() {
        return instance.get<ResTodosType[]>('/todo-lists')
    },
    addTodo(title: string) {
        return instance.post<DataTodolistType<{ item: ResTodosType }>>('/todo-lists', {
            title
        })
    },
    removeTodo(todolistId: string) {
        return instance.delete<DataTodolistType>(`/todo-lists/${todolistId}`)
    },
    updateTodo(todolistId: string, title: string) {
        return instance.put<DataTodolistType>(`/todo-lists/${todolistId}`, {title})
    }
}