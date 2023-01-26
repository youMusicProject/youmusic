import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'react-bootstrap';

const LogoutAuthButton = () => {
  const { logout } = useAuth0();
  return (
    <Button
      className='color-purple text-decoration-none'
      onClick={() => logout({ returnTo: window.location.origin })}
      variant='link'
    >Log Out</Button>
  );
};

export default LogoutAuthButton;