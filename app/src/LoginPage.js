import React from 'react';
import './LoginPage.css';
import GenericButton from './GenericButton';
import { login } from './actions';

const LoginPage = () => {

  return (
    <div className='login-page'>
      <div className='upper-login-part'>
        <div className='login-center-box'>
          <div className='login-banner'>
            Linkhub
          </div>
          <div>
            Storing Links
          </div>
          <GenericButton id="login" size="small" actions={[login]} label="Login"/>
        </div>
      </div>
      <div className='lower-login-part'>
        <div>
          daniel.loeffelholz@gmail.com
        </div>
        <div>
          https://github.com/danielloeh/linkhub
        </div>

      </div>
    </div>
  );
};

LoginPage.propTypes = {};

export default LoginPage;