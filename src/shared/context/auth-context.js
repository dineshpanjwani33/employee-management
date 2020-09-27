import { createContext } from 'react';

//Defining the context object
export const AuthContext = createContext({
    isLogeddin: false,
    userId: null,
    token: null,
    login: () => {},
    logout: () => {}
});