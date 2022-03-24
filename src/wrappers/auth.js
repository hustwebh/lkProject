import { Redirect } from 'umi';
import React from 'react';

export default (props) => {
  // const isLogin = localStorage.getItem('roles') !== null;

  if (localStorage.getItem('roles')) {
    let roles = JSON.parse(localStorage.getItem('roles'));
    // roles = typeof roles === 'string' ? [roles] : roles;
    // const isAuthorized = roles.indexOf('ROLE_ADMIN') !== -1;
    if (roles) {
      return <div>{props.children}</div>;
    }
  }
  return <Redirect to="/user/login" />;
};
