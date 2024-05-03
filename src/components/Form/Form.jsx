import { useState, useEffect } from 'react';
import './Form.css';
import { useDispatch, useSelector } from 'react-redux';
import { addNewContact, updateContact, deleteContact } from '../../store/actions/contactsActions';
import { createEmptyContact } from '../../store/reducers/contactsReducer';
import api from '../../api/contacts-service'

const Form = () => {

  const dispatch = useDispatch();
  const editingContact = useSelector(state => state.editingContact)
  const [contact, setContact] = useState({ ...editingContact });

  useEffect(() => {
    setContact({ ...editingContact });
  }, [editingContact]);

  const onInputChange = (event) => {
    setContact({ 
      ...contact, 
      [event.target.name]: event.target.value 
    });
  }

  const onContactDelete = (event) => {
    event.preventDefault()
    dispatch(deleteContact())
    setContact(createEmptyContact());
  }

  const onClearInput = (event) => {
    const sibling = event.target.previousSibling;
    setContact({ 
      ...contact, 
      [sibling.name]: '',
    });
  }

  const onFormSubmit = (event) => {
    event.preventDefault();
    if (!contact.id) {
      const newContact = {...contact}
      api.post('/contacts', newContact)
        .then(({ data }) => {
          dispatch(addNewContact(data))
          setContact(createEmptyContact())
        })
    } else {
      api.put(`/contacts/${contact.id}`, contact)
        .then(({ data }) => {
          dispatch(updateContact(data))
          setContact(createEmptyContact())
        })
    }
  }

  const isEditing = contact.id !== null;
  return (
    <>
        <form>
            <div className="input-container">
              <div className="wrapper-input">
                <input 
                type="text" 
                placeholder='First Name'
                name='fName'
                value={contact.fName}
                onChange={onInputChange}
                />
                <span
                onClick={onClearInput}
                >X</span>
                </div>
              <div className="wrapper-input">
                <input 
                type="text" 
                placeholder='Last Name'
                name='lName'
                value={contact.lName}
                onChange={onInputChange}/>
                <span
                onClick={onClearInput}
                >X</span>
              </div>
              <div className="wrapper-input">
                <input 
                type="email" 
                name="email" 
                id="email" 
                placeholder='Email Address'
                value={contact.email}
                onChange={onInputChange}/>
                <span
                onClick={onClearInput}
                >X</span>
              </div>
              <div className="wrapper-input">
                <input 
                type="text" 
                placeholder='Phone Number'
                name='phone'
                value={contact.phone}
                onChange={onInputChange}/>
                <span
                onClick={onClearInput}
                >X</span>
              </div>
            </div>
            <div className="btn-container">
                <button type='submit'>Save</button>
                {isEditing && (
                  <button onClick={onContactDelete}>Delete</button>
                )}
            </div>
        </form>
    </>
  );
}

export default Form;