import React from 'react';
import AuthenticationButton from './authentication-button';
import ProfilePage from './Profile/ProfilePage';

const AuthNav = () => (
  <div
    style={{
      // border:'1px solid red',
    }}
    className="navbar-nav ml-auto"
  >
    
    <AuthenticationButton />
  </div>
);

export default AuthNav;
