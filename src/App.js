import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import TaskList from './components/TaskList';
import Signup from './components/Signup';
import Login from './components/Login';
import Logout from './components/Logout';
import { Container, Box, Typography, AppBar, Toolbar, Button } from '@mui/material';

function AppContent() {
  const { user } = useAuth();
  const [isSignup, setIsSignup] = useState(false);

  const handleSwitchToSignup = () => {
    setIsSignup(true);
  };

  const handleSwitchToLogin = () => {
    setIsSignup(false);
  };

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Task Management App
          </Typography>
          {user && <Logout />}
        </Toolbar>
      </AppBar>
      <Box sx={{ my: 4 }}>
        {!user && (
          <>
            {isSignup ? (
              <Signup onSwitchToLogin={handleSwitchToLogin} />
            ) : (
              <Login onSwitchToSignup={handleSwitchToSignup} />
            )}
          </>
        )}
        {user && <TaskList />}
      </Box>
    </Container>
  );
}

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <AppContent />
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
