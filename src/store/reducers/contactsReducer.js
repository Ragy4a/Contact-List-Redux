import { CONTACT_TYPES } from "../actions/actionTypes";
import { contactsState, emptyContact } from "../../model/initialState";

const initialState = {
    contacts: contactsState,
    editingContact: emptyContact,
}

export default function contactReducer (state = initialState, action) {
    switch(action.type) {
        case CONTACT_TYPES.ADD_CONTACT:
            return {
                ...state,
                contacts: [...state.contacts, action.payload],
                editingContact: emptyContact,
            };
        case CONTACT_TYPES.DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact.id !== action.payload),
            }
        case CONTACT_TYPES.EDIT_CONTACT:
            return {
                ...state,
                editingContact: action.payload,
            }
        case CONTACT_TYPES.GET_CONTACTS:
            return {
                ...state,
                contacts: action.payload,
            }
        default: return state;
    }
}