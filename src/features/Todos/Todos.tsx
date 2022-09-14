import React, {ChangeEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addTodoTC, getTodosTC, removeTodoTC, TodolistStateType, updateTodoTC} from "./todos-reducer";
import {AppRootState} from "../../app/store";
import {EditableSpan} from "../../common/components/EditableSpan/EditableSpan";
import {Loader} from "../../common/components/Loader/Loader";
import {Navigate} from "react-router-dom";


export function Todos() {

    const dispatch: any = useDispatch()


    const todos = useSelector<AppRootState, TodolistStateType>((state) => state.todos)
    const isLoading = useSelector<AppRootState, boolean>((state) => state.app.isLoading)
    const isLogIn = useSelector<AppRootState, boolean>((state) => state.app.isLogIn)

    // + POST
    console.log(todos)

    const [title, setTitle] = useState('')

    const onTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    };

    const onAddClickHandler = () => {
        dispatch(addTodoTC(title))
        setTitle('')
    };

    useEffect(() => {
        isLogIn && dispatch(getTodosTC())
    }, [dispatch])

    if (!isLogIn) {
        return <Navigate to={'/login'}/>
    }


    return (
        <div>
            <h2>Todolists</h2>
            <div>
                <input onChange={onTitleChangeHandler} value={title}/>
                <button onClick={onAddClickHandler}>Add Todolist</button>
            </div>
            <ul>
                {
                    isLoading ? <Loader/> : (

                        todos.todos.map((t) => {

                            const onDeleteTodoHandler = () => {
                                dispatch(removeTodoTC(t.id))
                            };

                            const onChangeTitleTodolist = (title: string) => {
                                dispatch(updateTodoTC(t.id, title))
                            }

                            return (
                                <li key={t.id}>
                                    <h3>
                                        <EditableSpan onChangeTitle={onChangeTitleTodolist}>
                                            {t.title}
                                        </EditableSpan>{' '}
                                        <button onClick={onDeleteTodoHandler}>Del</button>
                                    </h3>
                                </li>
                            )
                        })
                    )
                }
            </ul>
        </div>
    );
}
