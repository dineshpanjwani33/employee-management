import React, { useContext } from 'react';

import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';

import { VALIDATOR_REQUIRE } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';

import './EmployeeForm.scss';

/*
    Renders the form for updating employee with pre-populated data
*/
const UpdateEmployee = props => {

    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const { employeeData } = props;
    const empId = employeeData.id;

    const employeeDataObj = {
        firstname: employeeData.firstname,
        lastname: employeeData.lastname,
        address: employeeData.address,
        dob: new Date(employeeData.dob).toISOString().slice(0, 10),
        mobile: employeeData.mobile,
        city: employeeData.city,
    };

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
        false);

    const formHandler = async (event) => {
        event.preventDefault();

        const inputsObj = {
            firstname: formState.inputs.firstname.value,
            lastname: formState.inputs.lastname.value,
            address: formState.inputs.address.value,
            dob: formState.inputs.dob.value,
            mobile: formState.inputs.mobile.value,
            city: formState.inputs.city.value,
        };

        //Checking existing values of form are changed or not   
        const areValuesChanged = JSON.stringify(inputsObj) !== JSON.stringify(employeeDataObj);

        /* If existing values are changed then update the values in db 
                    if not simply close the modal. This may save the cost of db calls */
        if (areValuesChanged) {
            try {
                await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/employees/${empId}`,
                    'PATCH',
                    {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + auth.token
                    },
                    JSON.stringify(inputsObj)
                );
                props.reloadEmployees();
            }
            catch (err) {
                console.log(err);
            }
        }
        else {
            props.closeModal();
        }
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />

            {/* Rendering form with resuable Input and Button components */}
            <form className="employee-form" onSubmit={formHandler}>
                {isLoading && <LoadingSpinner asOverlay />}
                <Input
                    id="firstname"
                    element="input"
                    type="text"
                    label="Firstname"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Plase enter a valid firstname"
                    onInput={inputChangeHandler}
                    initialValue={employeeDataObj.firstname}
                    initialValid={true}
                />
                <Input
                    id="lastname"
                    element="input"
                    type="text"
                    label="Lastname"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Plase enter a valid lastname"
                    onInput={inputChangeHandler}
                    initialValue={employeeDataObj.lastname}
                    initialValid={true}
                />
                <Input
                    id="address"
                    element="input"
                    label="Address"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Plase enter a valid address"
                    onInput={inputChangeHandler}
                    initialValue={employeeDataObj.address}
                    initialValid={true}
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
                    initialValue={employeeDataObj.dob}
                    initialValid={true}
                />
                <Input
                    id="mobile"
                    element="input"
                    label="Mobile No."
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Plase enter a valid mobile no."
                    onInput={inputChangeHandler}
                    initialValue={employeeDataObj.mobile}
                    initialValid={true}
                />
                <Input
                    id="city"
                    element="input"
                    label="City"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Plase enter a valid city"
                    onInput={inputChangeHandler}
                    initialValue={employeeDataObj.city}
                    initialValid={true}
                />
                <Button inverse type="submit" disabled={!formState.formIsValid}>UPDATE</Button>
            </form>
        </React.Fragment>
    )
};

export default UpdateEmployee;