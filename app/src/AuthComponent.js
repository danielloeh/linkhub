import React from 'react';
import { featureConfigPropType } from './FeatureConfigPropTypes';
import './LinkHub.css';
import { AUTH_STATE_IS_LOGGED_IN, AuthClient } from './AuthClient';
import { authPropTypes } from './AuthPropTypes';
import LoginPage from './LoginPage';

function notAuthenticated (authentication) {
  return authentication.authenticationState !== AUTH_STATE_IS_LOGGED_IN;
}

const AuthComponent = ({ featureConfig, authentication, location, isLoggedIn, updateUserDetails, saveAuthCredentials }) => {

  return (
    <div>
      {
        notAuthenticated(authentication) &&
        <LoginPage />
      }
      <AuthClient featureConfig={featureConfig} authentication={authentication} location={location}
        isLoggedIn={isLoggedIn} updateUserDetails={updateUserDetails} saveAuthCredentials={saveAuthCredentials}/>
    </div>);
};

AuthComponent.propTypes = {
  featureConfig: featureConfigPropType,
  authentication: authPropTypes,
};

export default AuthComponent;