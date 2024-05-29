import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField } from '@mui/material';

import './Form.css';
import { createContact, editContact, deleteContact } from '../../store/slices/contactSlice';

const ContactForm = () => {
  const dispatch = useDispatch();
  const editingContact = useSelector(state => state.contactList.editingContact);

  const onContactDelete = () => {
    dispatch(deleteContact(editingContact.id))
  }

  const onClearInput = (fieldName, setFieldValue) => {
    setFieldValue(fieldName, '');
  };

  const onFormSubmit = (values) => {
    if (!values.id) {
      dispatch(createContact(values));
    } else {
      dispatch(editContact(values));
    }
  }

  const schema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    phone: Yup.string()
      .matches(/^[+]?[0-9]{10,15}$/, 'Invalid phone number')
      .required('Phone number is required'),
  });

  const renderForm = ({ setFieldValue, initialValues, setValues, isValid }) => {

    useEffect(() => {
      setValues(initialValues);
    }, [initialValues, setValues]);

    return (
      <Form id='contact-form'>
        <div className="input-container">
          <div className="wrapper-input">
            <Field
              as={TextField}
              type="text" 
              placeholder='First Name'
              name='fName'
            />
            <span onClick={() => onClearInput('fName', setFieldValue)}>X</span>
          </div>
          <div className="wrapper-input">
            <Field 
              as={TextField}
              type="text" 
              placeholder='Last Name'
              name='lName'
            />
            <span onClick={() => onClearInput('lName', setFieldValue)}>X</span>
          </div>
          <div className="wrapper-input">
            <Field 
              as={TextField}
              type="email" 
              name="email"  
              placeholder='Email Address'
            />
            <span onClick={() => onClearInput('email', setFieldValue)}>X</span>
          </div>
            <ErrorMessage name='email'>
              {(msg) => <div className='error'>{msg}</div>}
            </ErrorMessage>
          <div className="wrapper-input">
            <Field 
              as={TextField}
              type="text" 
              placeholder='Phone Number'
              name='phone'
            />
            <span onClick={() => onClearInput('phone', setFieldValue)}>X</span>
          </div>
          <ErrorMessage name='phone'>
              {(msg) => <div className='error'>{msg}</div>}
            </ErrorMessage>
        </div>
        <div className="btn-container">
          <button type='submit' disabled={!isValid}>Save</button>
          {editingContact.id && (
            <button type='button' onClick={onContactDelete}>Delete</button>
          )}
        </div>
      </Form>
    )
  }

  return (
    <Formik
      enableReinitialize
      initialValues={{
        fName: editingContact.fName || '',
        lName: editingContact.lName || '',
        email: editingContact.email || '',
        phone: editingContact.phone || '',
      }}
      onSubmit={onFormSubmit}
      validationSchema={schema}
    >
      {renderForm}
    </Formik>
  );
}

export default ContactForm;