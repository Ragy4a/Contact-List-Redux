import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Item from '../Item/Item';
import { addNewContact, getContacts } from '../../store/slices/contactSlice';
import './List.css';

const List = () => {

  const contacts = useSelector(state => state.contactList.contacts)
  const dispatch = useDispatch()
  
  useEffect(() => {
      dispatch(getContacts())
  }, [dispatch])
  
  const onAddContact = () => {
    dispatch(addNewContact())
  }


  return (
    <div className="list">
      <div className="contacts">
          {contacts.map((contact) => {
            return ( 
            <Item
              key={contact.id}
              contact={contact}
            />
          )})}
      </div>
      <button id='create-new' onClick={onAddContact}>New</button>
    </div>
  );
}

export default List;