// const PrivateRoute = ({children}) => {

//     const user = localStorage.getItem('user')

//     const notNull = user != undefined || user != null;
//     const notEmpty = user !== "";
//     const login = notNull && notEmpty

//     if (login) return children
//     else window.location.href = "/"
// }

// export default PrivateRoute

import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children, roles }) => {

    const navigate = useNavigate()
  const user = localStorage.getItem('user');
  const role = localStorage.getItem('role');

  const notNull = user !== undefined && user !== null;
  const notEmpty = user !== "";
  const isLoggedIn = notNull && notEmpty;

  useEffect(() => {
      if (!isLoggedIn) {
        return navigate('/auth/login')
      }
    
      if (roles && roles.length > 0 && !roles.includes(role)) {
        return navigate('/admin/dashboard')
      }

  },[])

  return children;
};

export default PrivateRoute;
