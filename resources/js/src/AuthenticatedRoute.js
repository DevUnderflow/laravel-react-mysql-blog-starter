import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Redirect, withRouter } from'react-router';

const AuthenticatedRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={props => localStorage.getItem("user.api_token")? (
      <Component {...props}/>
  ):(
      <Redirect to={{pathname: "/login", state: {from: props.location}}}/>
  )
  } />
);

export default withRouter(AuthenticatedRoute);