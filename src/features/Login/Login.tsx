import React from 'react';
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {AppRootState} from "../../app/store";

export function Login() {


    const isLogIn = useSelector<AppRootState, boolean>((state) => state.app.isLogIn)

    if (isLogIn) {
        return <Navigate to={'/'}/>
    }

    return (
        <div>
            <h2>Login</h2>
            {/* Formik */}
        </div>
    );
}

