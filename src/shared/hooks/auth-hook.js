import { useState, useCallback, useEffect } from 'react';

let logoutTimer;

//Defining auth hook for login, logout and auto-login
export const useAuth = () => {

    const [token, setToken] = useState();
    const [tokenExpirationDate, setTokenExpirationDate] = useState();
    const [userId, setUserId] = useState();

    //Function to make user login to application and to set time for auto login  
    const login = useCallback((userId, token, expirationDate) => {
        setToken(token);
        setUserId(userId);
        const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
        setTokenExpirationDate(tokenExpirationDate);
        localStorage.setItem('userData', JSON.stringify({
            userId: userId,
            token: token,
            expiration: tokenExpirationDate.toISOString()
        }));
    }, []);

    //Function to make user logout from application  
    const logout = useCallback(() => {
        setToken(null);
        setTokenExpirationDate(null);
        setUserId(null);
        localStorage.removeItem('userData');
    }, []);

    /* To check remaining time for user to logout
    Calculate remaining time based on expiration time stored in local storage and current time  */
    useEffect(() => {
        if (token && tokenExpirationDate) {
            const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
            logoutTimer = setTimeout(logout, remainingTime);
        } else {
            clearTimeout(logoutTimer);
        }
    }, [token, logout, tokenExpirationDate]);


    //Check the expiration time for auto login
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData && userData.token && new Date(userData.expiration) > new Date()) {
            login(userData.userId, userData.token, new Date(userData.expiration));
        }
    }, [login]);

    return { token, login, logout, userId }
}