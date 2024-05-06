import { CONTACT_TYPES } from "./actionTypes";

export const createContact = () => ({
    type: CONTACT_TYPES.CREATE_CONTACT,
})

export const selectContact = (contact) => ({
    type: CONTACT_TYPES.SELECT_CONTACT,
    payload: contact,
})


 // Action
export const addNewContactAction = (contact) => ({
    type: CONTACT_TYPES.POST_CONTACT_ACTION,
    payload: contact,  
})

export const updateContactAction = (contact) => ({
    type: CONTACT_TYPES.PUT_CONTACT_ACTION,
    payload: contact,
})

export const getContactsAction = () => ({
    type: CONTACT_TYPES.GET_CONTACTS_ACTION,
})

export const deleteContactAction = (id) => ({
    type: CONTACT_TYPES.DELETE_CONTACT_ACTION,
    payload: id,
})
 // Request
 export const addNewContactRequest = () => ({
    type: CONTACT_TYPES.POST_CONTACT_REQUEST,
})

export const updateContactRequest = () => ({
    type: CONTACT_TYPES.PUT_CONTACT_REQUEST,
})

export const getContactsRequest = () => ({
    type: CONTACT_TYPES.GET_CONTACTS_REQUEST,
})

export const deleteContactRequest = () => ({
    type: CONTACT_TYPES.DELETE_CONTACT_REQUEST,
})

 // Success
 export const addNewContactSuccess = (contact) => ({
    type: CONTACT_TYPES.POST_CONTACT_SUCCESS,
    payload: contact,  
})

export const updateContactSuccess = (contact) => ({
    type: CONTACT_TYPES.PUT_CONTACT_SUCCESS,
    payload: contact,
})

export const getContactsSuccess = (contacts) => ({
    type: CONTACT_TYPES.GET_CONTACTS_SUCCESS,
    payload: contacts,
})

export const deleteContactSuccess = (id) => ({
    type: CONTACT_TYPES.DELETE_CONTACT_SUCCESS,
    payload: id,
})

// Error
export const addNewContactError = (error) => ({
    type: CONTACT_TYPES.POST_CONTACT_ERROR,
    payload: error,  
})

export const updateContactError = (error) => ({
    type: CONTACT_TYPES.PUT_CONTACT_ERROR,
    payload: error,
})

export const getContactsError = (error) => ({
    type: CONTACT_TYPES.GET_CONTACTS_ERROR,
    payload: error,
})

export const deleteContactError = (error) => ({
    type: CONTACT_TYPES.DELETE_CONTACT_ERROR,
    payload: error,
})