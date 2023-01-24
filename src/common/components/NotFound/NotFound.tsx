import React from 'react';
import page404 from "./404.jpg";

export function NotFound() {
    return (
        <div style={{width: '200px'}}>
            <img src={page404} alt="page 404"/>
        </div>
    );
}

