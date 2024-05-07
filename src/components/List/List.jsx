import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Item from '../Item/Item';
import './List.css';
import { getContactsAction, createContact } from '../../store/actions/contactsActions';

const List = ({ setIsEditing }) => {

  const contacts = useSelector(state => state.contacts)
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(getContactsAction())
  }, [dispatch])
  
  const onAddContact = () => {
    dispatch(createContact());
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