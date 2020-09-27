import React from 'react';
import ReactDOM from 'react-dom';

import './Backdrop.scss';

//Renders the backdrop for modal, side drawer
const Backdrop = props => {

  //Rendering the backdrop childern to load backdrop to top of application
  return ReactDOM.createPortal(
    <div className="backdrop" onClick={props.onClick}></div>,
    document.getElementById('backdrop-hook')
  );
};

export default Backdrop;
