import { Component } from 'react';
import { featureConfigPropType } from './FeatureConfigPropTypes';
import auth0 from 'auth0-js';
import { authPropTypes } from './AuthPropTypes';

export const AUTH_STATE_UNAUTHENTICATED = 'UNAUTHENTICATED';
export const AUTH_STATE_LOGIN_ISSUED = 'LOGIN_ISSUED';
export const AUTH_STATE_RESPONSE_RECEIVED = 'RESPONSE_RECEIVED';
export const AUTH_STATE_RESPONSE_PROCESSED = 'RESPONSE_PROCESSED';
export const AUTH_STATE_IS_LOGGED_IN = 'IS_LOGGED_IN';

export class AuthClient extends Component {

  initializeAuthClient ({ featureConfig }) {

    if (featureConfig.authURI && featureConfig.authClientID) {

      let server = window.location.origin;

      this.auth0 = new auth0.WebAuth({
        domain: `${featureConfig.authURI}`,
        clientID: `${featureConfig.authClientID}`,
        redirectUri: `${server}/callback`,
        audience: `https://${featureConfig.authURI}/api/v2/`,
        responseType: 'id_token token',
        scope: 'openid profile',
      });
    }
  }

  signIn () {
    this.auth0.authorize();
  }

  handleAuthentication (responseFragment) {

    if (!this.auth0) {
      return;
    }

    let self = this;

    this.auth0.parseHash({ hash: responseFragment }, function (err, authResult) {
      if (err) {
        return console.log(err);
      }

      self.props.saveAuthCredentials(authResult);

      self.auth0.client.userInfo(authResult.accessToken, function (err, user) {
        self.props.updateUserDetails(user);
      });

      self.props.isLoggedIn();
    });
  }

  render () {

    this.initializeAuthClient(this.props);

    if (this.props.authentication.authenticationState !== AUTH_STATE_IS_LOGGED_IN
      && this.props.authentication.responseFragment) {
      this.handleAuthentication(this.props.authentication.responseFragment);
    }

    if (this.props.authentication.authenticationState === AUTH_STATE_LOGIN_ISSUED) {
      this.signIn();
    }

    return null;
  }
}

AuthClient.propTypes = {
  featureConfig: featureConfigPropType,
  authentication: authPropTypes,
};
