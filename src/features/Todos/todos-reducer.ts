import {ResTodosType, todosAPI} from "./todos-api";
import {AxiosError} from "axios";
import {setLoadingAC, SetLoadingAT} from "../../app/app-reducer";


// export type TodosType = GetTodosType & {
//     filter: 'all'
// }


const initialState = {
    todos: [] as ResTodosType[]
}


export type TodolistStateType = typeof initialState

export type TodolistActionType =
    | GetTodosAT
    | AddTodoAT
    | RemoveTodoAT
    | UpdateTodoAT
    | SetLoadingAT

type GetTodosAT = ReturnType<typeof getTodosAC>
type AddTodoAT = ReturnType<typeof addTodoAC>
type RemoveTodoAT = ReturnType<typeof removeTodoAC>
type UpdateTodoAT = ReturnType<typeof updateTodoAC>


export const todosReducer = (state: TodolistStateType = initialState, action: TodolistActionType): TodolistStateType => {
    switch (action.type) {
        case 'TODOS/GET-TODOS':
            return {
                ...state,
                todos: action.todos
            }
        case 'TODOS/ADD-TODO':
            console.log('!!!')
            return {
                ...state,
                todos: [action.item, ...state.todos]
            }
        case 'TODOS/REMOVE-TODO':
            console.log('---')
            return {
                ...state,
                todos: state.todos.filter((t) => t.id !== action.todolistId)
            }
        case 'TODOS/UPDATE-TODO':
            return {
                ...state,
                todos: state.todos.map((t) => {
                    return t.id === action.todolistId ? {...t, title: action.title} : t
                })
            }
        default:
            return state
    }
}

//* # Action Creator

export const getTodosAC = (todos: ResTodosType[]) => ({
    type: 'TODOS/GET-TODOS',
    todos
}) as const

export const addTodoAC = (item: ResTodosType) => ({
    type: 'TODOS/ADD-TODO',
    item
}) as const

export const removeTodoAC = (todolistId: string) => ({
    type: 'TODOS/REMOVE-TODO',
    todolistId
}) as const

export const updateTodoAC = (todolistId: string, title: string) => ({
    type: 'TODOS/UPDATE-TODO',
    todolistId,
    title
}) as const


//* # Thunk Creator

export const getTodosTC = () => {
    return (dispatch: any) => {
        dispatch(setLoadingAC(true))
        todosAPI.getTodos()
            .then((res) => {
                dispatch(getTodosAC(res.data))
            })
            .catch((e: AxiosError) => {
                alert(e)
            })
            .finally(() => {
                dispatch(setLoadingAC(false))
            })
    }
}

export const addTodoTC = (title: string) => {
    return (dispatch: any) => {
        todosAPI.addTodo(title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    console.log('res.data.data.item', res.data.data.item)
                    dispatch(addTodoAC(res.data.data.item))
                    console.log('+++')
                } else {
                    alert('Errors:' + res.data.messages[0])
                }
            })
            .catch((e: AxiosError) => {
                alert(e.message)
            })
    }
}

export const removeTodoTC = (todolistId: string) => {
    return (dispatch: any) => {
        todosAPI.removeTodo(todolistId)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(removeTodoAC(todolistId))
                } else {
                    alert('Errors:' + res.data.messages[0])
                }
            })
            .catch((e: AxiosError) => {
                alert(e.message)
            })
    }
}

export const updateTodoTC = (todolistId: string, title: string) => {
    return (dispatch: any) => {
        todosAPI.updateTodo(todolistId, title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(updateTodoAC(todolistId, title))
                } else {
                    alert('Errors:' + res.data.messages[0])
                }
            })
            .catch((e: AxiosError) => {
                alert(e.message)
            })
    }
}




