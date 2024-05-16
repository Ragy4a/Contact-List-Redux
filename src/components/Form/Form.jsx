import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Form.css';
import { createContact, editContact, deleteContact } from '../../store/slices/contactSlice';

const Form = () => {

  const dispatch = useDispatch();
  const editingContact = useSelector(state => state.contactList.editingContact)
  const [contact, setContact] = useState(editingContact);

  useEffect(() => {
    setContact(editingContact);
  }, [editingContact]);

  const onInputChange = (event) => {
    setContact({ 
      ...contact, 
      [event.target.name]: event.target.value 
    });
  }

  const onContactDelete = (event) => {
    event.preventDefault()
    dispatch(deleteContact(contact.id))
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
      setContact(editingContact);
      dispatch(createContact(contact));
    } else {
      dispatch(editContact(contact));
    }
  }

  return (
    <>
        <form onSubmit={onFormSubmit}>
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
                {contact.id && (
                  <button onClick={onContactDelete}>Delete</button>
                )}
            </div>
        </form>
    </>
  );
}

export default Form;