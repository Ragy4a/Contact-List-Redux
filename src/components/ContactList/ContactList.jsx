import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import List from '@mui/material/List';
import { Box, Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ContactItem from '../ContactItem/ContactItem';
import { addNewContact, getContacts } from '../../store/slices/contactSlice';
import './ContactList.css'

const ContactList = () => {
  const contacts = useSelector((state) => state.contactList.contacts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  const onAddContact = () => {
    dispatch(addNewContact());
  };

  return (
    <Box id='container-lists'>
      <List id='item-list'>
        {contacts.map((contact) => (
          <ContactItem key={contact.id} contact={contact} />
        ))}
      </List>
      <Button id='new' variant="contained" color="primary" onClick={onAddContact} startIcon={<AddCircleIcon />}>
        New
      </Button>
    </Box>
  );
};

export default ContactList;