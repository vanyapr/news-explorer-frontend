import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// HOC компонент который оборачивает защищённые компоненты
const ProtectedRoute = ({ component: Component, ...props }) => {
  return (
    <Route>
      {
        () => (props.isUserLogined ? <Component {...props} /> : <Redirect to='/' />)
      }
    </Route>
  );
};

export default ProtectedRoute;
