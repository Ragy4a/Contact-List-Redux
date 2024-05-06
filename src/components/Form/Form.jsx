import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Form.css';
import { addNewContact, updateContact, deleteContact } from '../../store/actions/contactsActions';
import api from '../../api/contacts-service'

const Form = () => {

  const dispatch = useDispatch();
  const editingContact = useSelector(state => state.editingContact)
  const isEditing = useSelector(state => state.isEditing)
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
    api.delete(`/contacts/${contact.id}`)
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
      const newContact = {...contact}
      api.post('/contacts/', newContact)
        .then(({ data }) => {
          dispatch(addNewContact(data))
        })
    } else {
      api.put(`/contacts/${contact.id}`, contact)
        .then(({ data }) => {
          console.log(data)
          dispatch(updateContact(data))
        })
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
                {isEditing && (
                  <button onClick={onContactDelete}>Delete</button>
                )}
            </div>
        </form>
    </>
  );
}

export default Form;