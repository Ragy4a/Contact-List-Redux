import { CONTACT_TYPES } from "./actionTypes";

export const createContact = (contact) => ({
    type: CONTACT_TYPES.CREATE_CONTACT,
    payload: contact,
})

export const addNewContact = (contact) => ({
    type: CONTACT_TYPES.ADD_NEW_CONTACT,
    payload: contact,  
})

export const deleteContact = (id) => ({
    type: CONTACT_TYPES.DELETE_CONTACT,
    payload: id,
})

export const updateContact = (contact) => ({
    type: CONTACT_TYPES.UPDATE_CONTACT,
    payload: contact,
})

export const selectContact = (contact) => ({
    type: CONTACT_TYPES.SELECT_CONTACT,
    payload: contact,
})

export const saveContact = (contact) => ({
    type: CONTACT_TYPES.SAVE_CONTACT,
    payload: contact,
})


export const getContacts = (contacts) => ({
    type: CONTACT_TYPES.GET_CONTACTS,
    payload: contacts,
})