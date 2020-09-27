import React, { useReducer, useEffect } from 'react';

import { validate } from '../../util/validators';
import './Input.scss';

//Handling all the actions and updating state of each element
const inputReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators)
            };
        case 'TOUCH':
            return {
                ...state,
                isTouch: true
            }
        default:
            return state;
    }
}

// Renders the HTML input and textarea components
const Input = props => {

    /* using useReducer hook to maintain values 
        and validity of each input element  */
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue || '',
        isValid: props.initialValid || false,
        isTouch: false
    });

    // Dispatching the action if input element changed
    const changeHandler = event => {
        dispatch({
            type: 'CHANGE',
            val: event.target.value,
            validators: props.validators
        })
    }

    // Dispatching the action if input element touched
    const touchedHandler = () => {
        dispatch({
            type: 'TOUCH'
        })
    }

    const { id, onInput } = props;
    const { value, isValid } = inputState;

    useEffect(() => {
        onInput(id, value, isValid)
    }, [id, value, isValid, onInput]);

    const element = props.element === 'input' ?
        <input
            id={props.id}
            type={props.type}
            placeholder={props.placeholder}
            onBlur={touchedHandler}
            onChange={changeHandler}
            value={inputState.value}
            max={props.max}
        /> :
        <textarea
            id={props.id}
            rows={props.rows || 3}
            placeholder={props.placeholder}
            onChange={changeHandler}
            value={inputState.value}
            onBlur={touchedHandler}
        />

    return <div className={`form-group ${!inputState.isValid && inputState.isTouch && 'form-group--invalid'}`}>
        <label htmlFor={props.id} >{props.label}</label>
        {element}
        {!inputState.isValid && inputState.isTouch && <p>{props.errorText}</p>}
    </div>
};

export default Input;