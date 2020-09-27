import React, { useContext } from 'react';

import { AuthContext } from '../../../shared/context/auth-context';
import './NavLinks.scss';

// Renders the navigation links with Button component
const NavLinks = props => {
    const auth = useContext(AuthContext);

    return (
        <ul className="nav-links">
            <button onClick={auth.logout}>LOGOUT</button>

        </ul>
    )
};

export default NavLinks;