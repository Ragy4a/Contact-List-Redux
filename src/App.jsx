import List from './components/List/List'
import Form from './components/Form/Form';
import './App.css';
import { useState } from 'react';


function App ()  {


  return (
    <div className="project-container">
      <h2>Contact List</h2>
      <div className="wrapper">
        <List  />
        <Form  />
      </div>
    </div>
  );
};

export default App;