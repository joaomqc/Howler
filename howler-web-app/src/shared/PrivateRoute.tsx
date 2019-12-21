import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import UserRepository from 'infrastructure/auth.repository';

const PrivateRoute = ({ children: Children, ...rest }:any) => {

  const isLoggedIn = UserRepository.isLoggedIn();

  return (
    <Route
      {...rest}
      render={() =>
        isLoggedIn ? (
          Children
        ) : (
          <Redirect to='/login' />
        )
      }
    />
  )
}

export default PrivateRoute;