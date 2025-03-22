import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#1976d2', fontWeight: 'bold' }}>
          Smart Classroom
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" onClick={() => navigate('/')}>Home</Button>
          <Button color="inherit">Lectures</Button>
          <Button color="inherit">Feedback</Button>
          <Button color="inherit">Chatbot</Button>
          <Button color="inherit">Search</Button>
          <Button variant="outlined" color="primary" sx={{ ml: 2 }} onClick={() => navigate('/auth')}>Login</Button>
          <Button variant="contained" color="primary" onClick={() => navigate('/auth')}>Sign Up</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 