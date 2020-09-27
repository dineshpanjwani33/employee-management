import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import Backdrop from './Backdrop';
import './Modal.scss';


const ModalOverlay = props => {
  
  //Layout to render its child componets
  const content = (
    <div className={`main-modal ${props.className}`} style={props.style}>
      <header className={`main-modal__header ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>
      <div className={`main-modal__content ${props.contentClass}`}>
        {props.children}
      </div>
      <footer className={`main-modal__footer ${props.footerClass}`}>
        {props.footer}
      </footer>
    </div>
  );

  //Injecting the modal childern to load modal to top of application
  return ReactDOM.createPortal(content, document.getElementById('modal-hook'));
};

const Modal = props => {
  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="main-modal"
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </React.Fragment>
  );
};

export default Modal;
