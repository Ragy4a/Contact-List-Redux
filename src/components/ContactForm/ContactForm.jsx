import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { styled } from '@mui/material/styles';
import { Button, ButtonGroup, IconButton, TextField, Box } from '@mui/material';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BackspaceIcon from '@mui/icons-material/Backspace';
import { createEmptyContact, reg, getRandomPhoneExample } from '../../constants/constants';
import { createContact, editContact, deleteContact } from '../../store/slices/contactSlice';

import './ContactForm.css'

const CustomTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#333',
    color: 'white',          
    '& fieldset': {
      borderColor: 'gray',
    },
    '&:hover fieldset': {
      borderColor: 'white', 
    },
    '&.Mui-focused fieldset': {
      borderColor: 'black', 
    },
  },
  '& label.Mui-focused': {
    color: 'black', 
  },
  '& label': {
    color: 'gray'
  }
});

const ContactForm = () => {
  const dispatch = useDispatch();
  const editingContact = useSelector((state) => state.contactList.editingContact);

  const onContactDelete = () => {
    dispatch(deleteContact(editingContact.id));
  };

  const onClearInput = (fieldName, setFieldValue) => {
    setFieldValue(fieldName, '');
  };

  const onFormSubmit = (values, { setValues, setTouched }) => {
    if (!values.id) {
      dispatch(createContact(values));
      setValues(createEmptyContact());
      setTouched(createEmptyContact());
    } else {
      dispatch(editContact(values));
    }
  };

  const schema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    phone: Yup.string()
      .matches(reg, `Invalid phone number. Try like this - ${getRandomPhoneExample()}`)
      .required('Phone number is required'),
  });

  const renderForm = ({ setFieldValue, isValid, values }) => (
    <Form style={{width: '50%'}}>
      <Box display="flex" flexDirection="column" gap={2}>
        <Box display="flex" alignItems="center" gap={1}>
          <Field as={CustomTextField} type="text" label="First Name" name="fName" fullWidth />
          <IconButton className='clear' onClick={() => onClearInput('fName', setFieldValue)}>
            <BackspaceIcon />
          </IconButton>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <Field as={CustomTextField} type="text" label="Last Name" name="lName" fullWidth />
          <IconButton className='clear' onClick={() => onClearInput('lName', setFieldValue)}>
            <BackspaceIcon />
          </IconButton>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <Field as={CustomTextField} type="email" label="Email Address" name="email" fullWidth />
          <IconButton className='clear' onClick={() => onClearInput('email', setFieldValue)}>
            <BackspaceIcon />
          </IconButton>
        </Box>
        <ErrorMessage name="email" component="div" className="error" />
        <Box display="flex" alignItems="center" gap={1}>
          <Field as={CustomTextField} type="text" label="Phone Number" name="phone" fullWidth />
          <IconButton className='clear' onClick={() => onClearInput('phone', setFieldValue)}>
            <BackspaceIcon />
          </IconButton>
        </Box>
        <ErrorMessage name="phone" component="div" className="error" />
        <ButtonGroup>
          <Button type="submit" variant="contained" color="primary" disabled={!isValid} startIcon={<AccountCircleRoundedIcon />}>
            Save
          </Button>
          {values.id && (
            <Button id='deleteBtn' variant="contained" color="secondary" onClick={onContactDelete} startIcon={<DeleteForeverIcon />}>
              Delete
            </Button>
          )}
        </ButtonGroup>
      </Box>
    </Form>
  );

  return (
    <Formik
      enableReinitialize
      initialValues={editingContact ? editingContact : createEmptyContact()}
      onSubmit={onFormSubmit}
      validationSchema={schema}
    >
      {renderForm}
    </Formik>
  );
};

export default ContactForm;