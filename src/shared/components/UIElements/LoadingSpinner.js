import React from 'react';

import './LoadingSpinner.scss';

//Renders when the app is loading or when some actions taking time to complete
const LoadingSpinner = props => {
  return (
    <div className={`${props.asOverlay && 'loading-spinner__overlay'}`}>
      <div className="lds-dual-ring"></div>
    </div>
  );
};

export default LoadingSpinner;
