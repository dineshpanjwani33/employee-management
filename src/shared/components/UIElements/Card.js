import React from 'react';

import './Card.scss';

//Renders to provide better container for its child components
const Card = props => {
  return (
    <div className={`card ${props.className}`} style={props.style}>
      {props.children}
    </div>
  );
};

export default Card;
