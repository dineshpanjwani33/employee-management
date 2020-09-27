import React from 'react';


import './MainHeader.scss';

//Renders the navigation header with title and navlinks 
const MainHeader = props => {
    return (
        <div className="main-header">
            {props.children}
        </div>
    )
};

export default MainHeader;