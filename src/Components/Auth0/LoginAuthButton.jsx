import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'react-bootstrap';

const LoginAuth0Button = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Button
      name='Log in'
      className='color-purple btn-lg text-decoration-none'
      onClick={() => loginWithRedirect()}
      variant='link'
    >Log in</Button>
  );
};

export default LoginAuth0Button;
