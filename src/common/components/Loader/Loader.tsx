import React from 'react';
// import loader from './loader.svg'
import loader from './loader.gif'

export function Loader() {


    return (
        <div>
            <h2>Loading...</h2>
            <img src={loader} alt="Loader"/>
        </div>
    );
}
