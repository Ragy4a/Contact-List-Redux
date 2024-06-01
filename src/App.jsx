import React from 'react';
import { Box, ThemeProvider, Typography, Container } from '@mui/material';
import { createTheme } from '@mui/material';
import ContactList from './components/ContactList/ContactList';
import ContactForm from './components/ContactForm/ContactForm';
import './App.css';

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container id="project-container">
        <Typography variant="h3" gutterBottom align="center">
          Contact List
        </Typography>
        <Box sx={{display: 'flex', width: '100%'}}>
          <ContactList />
          <ContactForm />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;