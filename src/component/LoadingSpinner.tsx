import React from 'react';
import Spinner from 'react-native-loading-spinner-overlay';

export const LoadingSpinner = () => {
  return (
    <Spinner
      visible
      color={"black"}
      textContent={'Loading...'}
      textStyle={spinnerTextStyle}
      overlayColor="rgba(0,100,255,0.5)" />
  )
};

const spinnerTextStyle = {
  color: 'black',
  fontSize: 15,
};