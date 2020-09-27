import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';
import './MainNavigation.scss';
import Backdrop from '../UIElements/Backdrop';

/* Renders the navigation with Backdrop, Side drawer and Main header components */
const MainNavigation = props => {

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const openDrawerHandler = () => {
        setIsDrawerOpen(true);
    }

    const closeDrawerHandler = () => {
        setIsDrawerOpen(false);
    }

    return (
        <React.Fragment>
            {isDrawerOpen && (
                <Backdrop onClick={closeDrawerHandler} />
            )}
            <SideDrawer show={isDrawerOpen} onClick={closeDrawerHandler}>
                <nav className="main-navigation__drawer-nav">
                    <NavLinks />
                </nav>
            </SideDrawer>
            <MainHeader>
                <button className="main-navigation__menu-btn" onClick={openDrawerHandler}>
                    <span />
                    <span />
                    <span />
                </button>
                <h1 className="main-navigation__title">
                    <Link to="/">Employee Management</Link>
                </h1>
                <nav className="main-navigation__header-nav">
                    <NavLinks />
                </nav>
            </MainHeader>
        </React.Fragment>
    );
};

export default MainNavigation;