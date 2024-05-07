import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Item from '../Item/Item';
import { createContact, getContacts } from '../../store/actions/contactsActions';
import './List.css';
import api from '../../api/contacts-service'

const List = ({ setIsEditing }) => {

  const contacts = useSelector(state => state.contacts)
  const dispatch = useDispatch()
  
  useEffect(() => {
    api.get('/contacts')
    .then(({ data }) => {
      dispatch(getContacts(data))
    })
    .catch(error => `Error to achive contacts: ${error}`)
  }, [getContacts])
  
  const onAddContact = () => {
    dispatch(createContact())
    setIsEditing(false)
  }


  return (
    <div className="list">
      <div className="contacts">
          {contacts.map((contact) => (
            <Item 
            setIsEditing={setIsEditing}
            key={contact.id}
            contact={contact}
            />
          ))}
      </div>
      <button id='create-new' onClick={onAddContact}>New</button>
    </div>
  );
}

export default List;