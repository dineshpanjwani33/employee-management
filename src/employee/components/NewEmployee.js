import React, { useContext } from 'react';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import { VALIDATOR_REQUIRE } from '../../shared/util/validators';
import { AuthContext } from '../../shared/context/auth-context';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';

import './EmployeeForm.scss';

/*
    Renders the form for adding new employee
*/
const NewEmployee = (props) => {

    const auth = useContext(AuthContext);

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    /* Using custom hook called useForm to handle 
        the whole form values and validity */
    const [formState, inputChangeHandler] = useForm({
        firstname: {
            value: '',
            isValid: false
        },
        lastname: {
            value: null,
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
        mobile: {
            value: '',
            isValid: false
        },
        city: {
            value: '',
            isValid: false
        },
    },
        false)

    /* Adding employee by calling respective api using sendRequest function 
        returned by custom hook called useHttpClient */
    const formSubmitHandler = async event => {
        event.preventDefault();
        try {
            await sendRequest(
                process.env.REACT_APP_BACKEND_URL + '/employees/',
                'POST',
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                },
                JSON.stringify({
                    firstname: formState.inputs.firstname.value,
                    lastname: formState.inputs.lastname.value,
                    address: formState.inputs.address.value,
                    dob: formState.inputs.dob.value,
                    mobile: formState.inputs.mobile.value,
                    city: formState.inputs.city.value,
                })
            );
            props.reloadEmployees();
            props.onClick();
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />

            {/* Rendering form with resuable Input and Button components */}
            <form className="employee-form" onSubmit={formSubmitHandler}>
                {isLoading && <LoadingSpinner asOverlay />}
                <Input
                    id="firstname"
                    element="input"
                    type="text"
                    label="Firstname"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Plase enter a valid firstname"
                    onInput={inputChangeHandler}
                />
                <Input
                    id="lastname"
                    element="input"
                    type="text"
                    label="Lastname"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Plase enter a valid lastname"
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
                    id="mobile"
                    element="input"
                    label="Mobile No."
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Plase enter a valid mobile no."
                    onInput={inputChangeHandler}
                /><Input
                    id="city"
                    element="input"
                    label="City"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Plase enter a valid city"
                    onInput={inputChangeHandler}
                />
                <Button inverse type="submit" disabled={!formState.formIsValid}  >ADD EMPLOYEE</Button>
            </form>
        </React.Fragment>
    )
};

export default NewEmployee;