import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { TextField, Button, Container, Typography, Box, Link } from '@mui/material';

const Signup = ({ onSwitchToLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password);
      alert('User created successfully');
      onSwitchToLogin(); // Automatically switch to login after successful signup
    } catch (err) {
      console.error(err);
      alert('Error creating user');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5 }}>
        <Typography variant="h5">Signup</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Signup
          </Button>
        </Box>
        <Link component="button" variant="body2" onClick={onSwitchToLogin}>
          Already have an account? Login
        </Link>
      </Box>
    </Container>
  );
};

export default Signup;
