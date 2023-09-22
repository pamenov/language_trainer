import React from 'react';
import { Navigate } from "react-router-dom";

function ProtectedRoute({ isSignedIn, children}) {
  return  isSignedIn ? children : <Navigate to='/signin' />
}
export default ProtectedRoute;