import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from '@mui/material';

const Logout = () => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    alert('Logout successful');
  };

  return (
    <Button onClick={handleLogout} variant="contained" color="secondary">
      Logout
    </Button>
  );
};

export default Logout;
