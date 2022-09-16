import React from 'react';
import {useDispatch} from "react-redux";

export function Logout() {
    const dispatch = useDispatch()

    return (
        <div>
            dispatch(logoutTC())
        </div>
    );
}