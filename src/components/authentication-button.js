import React from 'react';

import LoginButton from './login-button';
import LogoutButton from './logout-button';
import ProfilePage from './Profile/ProfilePage';

import { Route, Switch } from 'react-router-dom';

import { useAuth0 } from '@auth0/auth0-react';
import ProfileButton from './Profile/profile-button';

const AuthenticationButton = () => {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated ? (
    <>
      <LogoutButton /> <ProfilePage />
    </>
  ) : (
    <>
      <LoginButton />
      <ProfileButton />
    </>
  );
};

export default AuthenticationButton;
