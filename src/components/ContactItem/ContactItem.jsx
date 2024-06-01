import React from 'react';
import { useDispatch } from 'react-redux';
import ListItem from '@mui/material/ListItem';
import { IconButton, Typography, ListItemSecondaryAction, ListItemAvatar, Avatar } from '@mui/material';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { deleteContact, selectContact } from '../../store/slices/contactSlice';
import './ContactItem.css'

const ContactItem = ({ contact }) => {
  const dispatch = useDispatch();

  const onEdit = () => {
    dispatch(selectContact(contact));
  };

  const onDelete = () => {
    dispatch(deleteContact(contact.id));
  };

  const defaultAvatar = contact.fName.charAt(0) + contact.lName.charAt(0);

  const getRandomRGB = () => {
    const getRandomColor = () => {
      return Math.floor(Math.random() * 255);
    };
    return `rgb(${getRandomColor()}, ${getRandomColor()}, ${getRandomColor()})`
  }

  return (
    <ListItem button onDoubleClick={onEdit} id='item'>
      <ListItemAvatar>
        {contact.image 
        ? <Avatar alt='avatar' src={contact.image} />
        : <Avatar alt='avatar' sx={{bgcolor: getRandomRGB()}}>{defaultAvatar.toUpperCase()}</Avatar>}
      </ListItemAvatar>
      <Typography id='content'>
        {contact.fName} {contact.lName}
      </Typography>
      <ListItemSecondaryAction>
        <IconButton id='delete' edge="end" onClick={onDelete}>
          <PersonRemoveIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default ContactItem;