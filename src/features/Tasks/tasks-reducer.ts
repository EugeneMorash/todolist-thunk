const initialState = {}

export type TasksStateType = typeof initialState
export type TasksActionType = any

export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionType): TasksStateType => {
    switch (action.type) {
        default:
            return state
    }
}