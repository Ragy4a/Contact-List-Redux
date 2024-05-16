import React from 'react';
import { useDispatch } from 'react-redux';
import './Item.css';
import { deleteContact, selectContact } from '../../store/slices/contactSlice';

const Item = ({ contact }) => {

  const dispatch = useDispatch()

  const onEdit = () => {
    dispatch(selectContact(contact))
  }

  const onDelete = () => {
    dispatch(deleteContact(contact.id))
  }

  return (
    <div className='contact'>
      <p onDoubleClick={onEdit}>
        {contact.fName} {contact.lName}
      </p>
      <span onClick={onDelete}>X</span>
    </div>
  );
}

export default Item;