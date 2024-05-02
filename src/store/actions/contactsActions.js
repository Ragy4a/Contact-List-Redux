import { CONTACT_TYPES } from "./actionTypes";

export const addContact = (contact) => ({
    type: CONTACT_TYPES.ADD_CONTACT,
    payload: contact,  
})

export const deleteContact = (id) => ({
    type: CONTACT_TYPES.DELETE_CONTACT,
    payload: id,
})

export const editContact = (contact) => ({
    type: CONTACT_TYPES.EDIT_CONTACT,
    payload: contact,
}) 

export const getContacts = (contacts) => ({
    type: CONTACT_TYPES.GET_CONTACTS,
    payload: contacts,
})