import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addContact, deleteContact, editContact, getContacts } from './store/actions/contactsActions';
import List from './components/List/List';
import Form from './components/Form/Form';
import './App.css';
import api from './api/contacts-service';

const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts);
  const editingContact = useSelector(state => state.editingContact);

  useEffect(() => {
    api.get('/contacts')
      .then(({ data }) => {
        if (data.length > 0) {
          dispatch(getContacts(data));
        } else {
          console.log("No contacts found");
        }
      })
      .catch((error) => console.error('Error loading the contacts: ', error));
  }, [dispatch]);

  const addNewContact = () => {
    dispatch(editContact(createEmptyContact()));
  };

  const selectContact = (contact) => {
    dispatch(editContact(contact));
  };

  const saveContact = (contact) => {
    if (contact.id) {
      api.put(`/contacts/${contact.id}`, contact)
        .then(({ data }) => {
          dispatch(editContact(createEmptyContact()));
          dispatch(getContacts(contacts.map(item => item.id === data.id ? data : item)));
        })
        .catch(error => console.error('Error updating the contact: ', error));
    } else {
      const newContact = { ...contact };
      api.post('/contacts', newContact)
        .then(({ data }) => {
          dispatch(addContact(data));
          dispatch(editContact(createEmptyContact()));
        })
        .catch(error => console.error('Error creating a new contact: ', error));
    }
  };

  const removeContact = (id) => {
    api.delete(`/contacts/${id}`)
      .then(() => {
        dispatch(deleteContact(id));
      })
      .catch(error => console.error('Error deleting the contact: ', error));
  };

  const createEmptyContact = () => {
    return { 
      id: null, 
      fName: '', 
      lName: '', 
      email: '', 
      phone: '' 
    };
  };

  return (
    <div className="project-container">
      <h2>Contact List</h2>
      <div className="wrapper">
        <List
          contacts={contacts}
          onDelete={removeContact}
          onAddContact={addNewContact}
          onSelectContact={selectContact}
        />
        <Form
          editingContact={editingContact}
          onSave={saveContact}
          onDelete={removeContact}
          onCreateEmptyContact={createEmptyContact}
        />
      </div>
    </div>
  );
};

export default App;