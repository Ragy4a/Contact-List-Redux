import React from 'react';
import { useDispatch } from 'react-redux';
import './Item.css';
import { deleteContactAction, selectContact } from '../../store/actions/contactsActions';

const Item = ({ contact }) => {

  const dispatch = useDispatch()

  const onEdit = (contact) => {
    dispatch(selectContact(contact))
  }

  const onDelete = (id) => {
    dispatch(deleteContactAction(id))
  }

  return (
    <div className='contact'>
      <p onDoubleClick={() => onEdit(contact)}>
        {contact.fName} {contact.lName}
      </p>
      <span onClick={() => onDelete(contact.id)}>X</span>
    </div>
  );
}

export default Item;