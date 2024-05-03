import React, { useEffect } from 'react';
import Item from '../Item/Item';
import './List.css';
import { useDispatch, useSelector } from 'react-redux';
import { addNewContact, getContacts } from '../../store/actions/contactsActions';
import api from '../../api/contacts-service'

const List = () => {

  const contacts = useSelector(state => state.contacts)
  const dispatch = useDispatch()
  
  useEffect(() => {
    api.get('/contacts/')
    .then(({ data }) => dispatch(getContacts(data)))
    .catch(error => `Error to achive contacts: ${error}`)
  }, [dispatch])
  
  const onAddContact = (contact) => {
    api.post('/contacts/', contact)
    .then(({ data }) => {
      dispatch(addNewContact(data))
    })
    .catch(error => console.error('Error creating a new contact: ', error));
  }


  return (
    <div className="list">
      <div className="contacts">
          {contacts.map((contact) => (
            <Item 
            key={contact.id}
            contact={contact}
            />
          ))}
      </div>
      <button id='create-new' onClick={() => onAddContact}>New</button>
    </div>
  );
}

export default List;