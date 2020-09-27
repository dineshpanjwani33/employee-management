import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import './SideDrawer.scss';

//Renders the navigation for mobile and tablet devices
const SideDrawer = props => {

    //using CSSTransition to animate the component
    const drawer = (
        <CSSTransition
            in={props.show}
            timeout={200}
            classNames="slide-in-left"
            mountOnEnter
            unmountOnExit
        >
            <aside className="side-drawer" onClick={props.onClick}>{props.children}</aside>
        </CSSTransition>
    )

    //Rendering the side drawer childern to load drawer to top of application 
    return ReactDOM.createPortal(drawer, document.getElementById('drawer-hook'));
};

export default SideDrawer;