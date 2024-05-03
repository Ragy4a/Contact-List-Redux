import React, { useEffect } from 'react';
import Item from '../Item/Item';
import './List.css';
import { useDispatch, useSelector } from 'react-redux';
import { addNewContact, getContacts } from '../../store/actions/contactsActions';
import api from '../../api/contacts-service'

const List = () => {

  const dispatch = useDispatch()
  const contacts = useSelector(state => state.contacts)
console.log(contacts)

  useEffect(() => {
    api.get('/contacts')
      .then(({ data }) => dispatch(getContacts(data)))
      .catch(error => `Error to achive contacts: ${error}`)
  }, [dispatch])
  

  const onAddContact = () => {
    dispatch(addNewContact())
  }
  

  return (
    <div className="list">
      <div className="contacts">
        <div className="contact">
          {contacts.map((contact) => (
            <Item 
            />
          ))}
        </div>
      </div>
      <button id='create-new' onClick={onAddContact}>New</button>
    </div>
  );
}

export default List;