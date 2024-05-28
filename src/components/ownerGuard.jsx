import React, { useState } from 'react';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
function OwnerGuard({children}){
    const token = useState(localStorage.getItem("xyz"));
    console.log(token[0]);
    return token[0] !== 'owner'  ? <ErrorPage state={401} /> : children;
  }

export default OwnerGuard;