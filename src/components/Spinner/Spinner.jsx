import React, { useEffect, useState } from 'react';

import './Spinner.css'



const Spinner = () => {
  
  return (
    <div className='spinner-cont'>
        <img src="/assets/images/spinner.gif" alt="spinner" />
        <span>CARGANDO...</span>
    </div>
  );
};

export default Spinner;