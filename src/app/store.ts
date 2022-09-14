import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import thunk from "redux-thunk";
import {tasksReducer} from "../features/Tasks/tasks-reducer";
import {todosReducer} from "../features/Todos/todos-reducer";
import {appReducer} from "./app-reducer";


const rootReducer = combineReducers({
    app: appReducer,
    tasks: tasksReducer,
    todos: todosReducer,
})

export type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk))


// @ts-ignore
window.store = store


// const store = {
//     _state: {
//         tasks: {
//
//         },
//         todos: {
//
//         }
//     },
//     getState() {
//         return this._state
//     },
//     dispatch(action: object) {
//         if (typeof action === 'function') {
//             action(this.dispatch, this.getState)
//         } else {
//             rootReducer(action)
//         }
//     },
//     subcribe() {
//
//     }
// }