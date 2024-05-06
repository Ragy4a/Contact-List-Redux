import { CONTACT_TYPES } from "../actions/actionTypes";
import { contactsState } from "../../model/initialState";

const initialState = {
    contacts: contactsState,
    editingContact: createEmptyContact(),
    isEditing: false,
}

export default function contactReducer (state = initialState, { type, payload }) {
    switch(type) {
        case CONTACT_TYPES.CREATE_CONTACT:
            return {
                ...state,
                editingContact: createEmptyContact(),
                isEditing: false,
            }
        case CONTACT_TYPES.ADD_NEW_CONTACT:
            return {
                ...state,
                contacts: [...state.contacts, payload],
                editingContact: createEmptyContact(),
            };
        case CONTACT_TYPES.DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(
                    contact => contact.id !== payload),
                editingContact: createEmptyContact(),
            }
        case CONTACT_TYPES.SELECT_CONTACT:
            return {
                ...state,
                editingContact: payload,
                isEditing: true,
            }
        case CONTACT_TYPES.UPDATE_CONTACT:
            const updatedContacts = state.contacts.map(contact =>
                contact.id === payload.id ? payload : contact);
            return {
                ...state,
                contacts: updatedContacts,
            };
        case CONTACT_TYPES.GET_CONTACTS:
            return {
                ...state,
                contacts: payload,
            }
        default:
            return state;
    }
}

export function createEmptyContact () {
    return {
    fName: '',
    lName: '',
    email: '',
    phone: '',
    };
}