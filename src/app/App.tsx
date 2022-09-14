import React, {useEffect} from 'react';
import {Todos} from "../features/Todos/Todos";
import {Navigate, NavLink, Route, Routes} from "react-router-dom";
import {useDispatch} from "react-redux";
import {isAuthMeTC} from "./app-reducer";
import {NotFound} from "../common/components/NotFound/NotFound";
import {Login} from "../features/Login/Login";


function App() {
    const dispatch: any = useDispatch()

    useEffect(() => {
        dispatch(isAuthMeTC())
    }, [dispatch])

    return (
        <div>
            <NavLink to={'/'}>main</NavLink>---
            <NavLink to={'/login'}>login</NavLink>

            <Routes>
                <Route path={'/'} element={<Todos/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/404'} element={<NotFound/>}/>
                <Route path={'/*'} element={<Navigate to={'/404'}/>}/>
            </Routes>
        </div>
    );
}

export default App;
