import React from 'react';
import './Item.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact, selectContact } from '../../store/actions/contactsActions';
import api from '../../api/contacts-service'

const Item = ({ contact }) => {

  const dispatch = useDispatch()

  const onEdit = (contact) => {
    dispatch(selectContact(contact))
  }

  const onDelete = (id) => {
    api.delete(`/contacts/${id}`)
      .then(({ data }) => dispatch(deleteContact(id)))
      .catch(error => `Can not to delete contact: ${error}`)
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