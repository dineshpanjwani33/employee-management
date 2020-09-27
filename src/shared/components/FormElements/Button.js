import React from 'react';

import './Button.scss';

// Renders the HTML button component
const Button = props => {

  return (
    <button
      className={`btn btn-${props.size || 'xs'} ${props.inverse &&
        'btn-primary'} ${props.danger && 'btn-danger'} 
        ${props.edit && 'fa fa-pencil'} 
        ${props.delete && 'fa fa-trash'}`}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button >
  );
};

export default Button;
