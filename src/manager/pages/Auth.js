import React, { useState, useContext } from 'react';

import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import Card from '../../shared/components/UIElements/Card'
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';

import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';

import './Auth.scss';

/*
    Renders the authentication page with login and signup form
*/

const Auth = () => {
    const auth = useContext(AuthContext);

    const [isLoginMode, setIsLoginMode] = useState(true);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    /* Using custom hook called useForm to handle 
        the whole form values and validity */
    const [formState, inputChangeHandler, setFormData] = useForm({
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        }
    }, false);

    const switchModeHandler = () => {
        if (!isLoginMode) {
            setFormData({
                ...formState.inputs,
                firstname: undefined,
                lastname: undefined,
                address: undefined,
                dob: undefined,
                company: undefined,
            }, formState.inputs.email.isValid && formState.inputs.password.isValid)
        }
        else {
            setFormData({
                ...formState.inputs,
                firstname: {
                    value: '',
                    isValid: false
                },
                lastname: {
                    value: '',
                    isValid: false
                },
                address: {
                    value: '',
                    isValid: false
                },
                dob: {
                    value: '',
                    isValid: false
                },
                company: {
                    value: '',
                    isValid: false
                }
            }, false)
        }
        setIsLoginMode(prevMode => !prevMode)
    }

    /* Performing authentication for managers by calling respective api using sendRequest function 
        returned by custom hook called useHttpClient whenever any of the dependency changed */ 
    const formHandler = async (event) => {
        event.preventDefault();

        console.log(formState.inputs);

        if (isLoginMode) {
            try {
                const responseData = await sendRequest(
                    process.env.REACT_APP_BACKEND_URL+'/managers/login',
                    'POST',
                    {
                        'Content-Type': 'application/json'
                    },
                    JSON.stringify({
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value
                    })
                );

                auth.login(responseData.userId, responseData.token);
            }
            catch (err) {

            }
        }
        else {
            try {
                const responseData = await sendRequest(
                    process.env.REACT_APP_BACKEND_URL+'/managers/signup',
                    'POST',
                    {
                        'Content-Type': 'application/json'
                    },
                    JSON.stringify({
                        firstname: formState.inputs.firstname.value,
                        lastname: formState.inputs.lastname.value,
                        address: formState.inputs.address.value,
                        dob: formState.inputs.dob.value,
                        company: formState.inputs.company.value,
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value
                    })
                );
                auth.login(responseData.userId, responseData.token);
            }
            catch (err) {
            }
        }
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            
            {/* Rendering form with resuable Card, Input and Button components */ }
            <Card className="authentication">
                {isLoading && <LoadingSpinner asOverlay />}
                <form onSubmit={formHandler}>
                    {!isLoginMode &&
                        <React.Fragment>
                            <Input
                                id="firstname"
                                element="input"
                                label="Your First Name"
                                type="text"
                                validators={[VALIDATOR_REQUIRE()]}
                                errorText="Plase enter a valid first name"
                                onInput={inputChangeHandler}
                            />
                            <Input
                                id="lastname"
                                element="input"
                                label="Your Last Name"
                                type="text"
                                validators={[VALIDATOR_REQUIRE()]}
                                errorText="Plase enter a valid last name"
                                onInput={inputChangeHandler}
                            />
                            <Input
                                id="address"
                                element="input"
                                label="Address"
                                validators={[VALIDATOR_REQUIRE()]}
                                errorText="Plase enter a valid address"
                                onInput={inputChangeHandler}
                            />
                            <Input
                                id="dob"
                                type="date"
                                element="input"
                                label="DOB"
                                validators={[VALIDATOR_REQUIRE()]}
                                errorText="Plase select a valid dob"
                                onInput={inputChangeHandler}
                                max={new Date().toISOString().slice(0, 10)}
                            />
                            <Input
                                id="company"
                                element="input"
                                label="Company"
                                validators={[VALIDATOR_REQUIRE()]}
                                errorText="Plase enter a valid company name"
                                onInput={inputChangeHandler}
                            />
                        </React.Fragment>}
                    <Input
                        id="email"
                        element="input"
                        label="E-Mail"
                        type="email"
                        validators={[VALIDATOR_EMAIL()]}
                        errorText="Plase enter a valid email"
                        onInput={inputChangeHandler}
                    />
                    <Input
                        id="password"
                        element="input"
                        label="Password"
                        type="password"
                        validators={[VALIDATOR_MINLENGTH(6)]}
                        errorText="Please enter a valid password (min. 6 characters)"
                        onInput={inputChangeHandler}
                    />
                    <Button danger type="submit" size="sm" disabled={!formState.formIsValid}>{isLoginMode ? 'LOGIN' : 'SIGN UP'}</Button>
                </form>
                <Button inverse size="sm" onClick={switchModeHandler}>SWITCH TO {isLoginMode ? 'SIGN UP' : 'LOGIN'}</Button>
            </Card>
        </React.Fragment>
    )
};

export default Auth;