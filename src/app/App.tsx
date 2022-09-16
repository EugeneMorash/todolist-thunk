import React, {useEffect} from 'react';
import {Todos} from "../features/Todos/Todos";
import {Navigate, NavLink, Route, Routes} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {isAuthMeTC} from "./app-reducer";
import {NotFound} from "../common/components/NotFound/NotFound";
import {Login} from "../features/Login/Login";
import {AppRootStateType} from "./store";


function App() {

    const isLogIn = useSelector<AppRootStateType, boolean>((state) => state.app.isLogIn)

    const dispatch: any = useDispatch()

    useEffect(() => {
        dispatch(isAuthMeTC())
    }, [dispatch])

    return (
        <div>
            <NavLink to={'/'}>main</NavLink>---
            {isLogIn ?
                <NavLink to={'/login'}>login</NavLink>
                :
                <NavLink to={'/logout'}>logout</NavLink>
            }

            <Routes>
                <Route path={'/'} element={<Todos/>}/>
                <Route path={'/login'} element={<Login/>}/>
                {/*<Route path={'/logout'} element={<Login/>}/>*/}
                <Route path={'/404'} element={<NotFound/>}/>
                <Route path={'/*'} element={<Navigate to={'/404'}/>}/>
            </Routes>
        </div>
    );
}

export default App;
