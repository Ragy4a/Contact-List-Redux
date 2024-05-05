import { CONTACT_TYPES } from "../actions/actionTypes";
import { contactsState } from "../../model/initialState";

const initialState = {
    contacts: contactsState,
    editingContact: createEmptyContact(),
    isFetching: false,
}

export default function contactReducer (state = initialState, { type, payload }) {
    switch(type) {

        case CONTACT_TYPES.CREATE_CONTACT:
            return {
                ...state,
                editingContact: createEmptyContact(),
            }
            case CONTACT_TYPES.SELECT_CONTACT:
                return {
                    ...state,
                    editingContact: payload,
                }
                
        // Success
        case CONTACT_TYPES.POST_CONTACT_SUCCESS:
            return {
                ...state,
                contacts: [...state.contacts, payload],
                editingContact: createEmptyContact(),
                isFetching: false,
            };
        case CONTACT_TYPES.DELETE_CONTACT_SUCCESS:
            return {
                ...state,
                contacts: state.contacts.filter(
                    contact => contact.id !== payload),
                editingContact: createEmptyContact(),
                isFetching: false,
            }
        case CONTACT_TYPES.PUT_CONTACT_SUCCESS:
            const updatedContacts = state.contacts.map(contact =>
                contact.id === payload.id ? payload : contact);
            return {
                ...state,
                contacts: updatedContacts,
                editingContact: createEmptyContact(),
                isFetching: false,
            };
        case CONTACT_TYPES.GET_CONTACTS_SUCCESS:
            return {
                ...state,
                contacts: payload,
                isFetching: false,
            }
        // Request
        case CONTACT_TYPES.POST_CONTACT_REQUEST:
        case CONTACT_TYPES.PUT_CONTACT_REQUEST:
        case CONTACT_TYPES.DELETE_CONTACT_REQUEST:
        case CONTACT_TYPES.GET_CONTACTS_REQUEST:
            return { 
                ...state, 
                isFetching: true, 
                error: null 
            };
    
        // Error
        case CONTACT_TYPES.POST_CONTACT_ERROR:
        case CONTACT_TYPES.PUT_CONTACT_ERROR:
        case CONTACT_TYPES.DELETE_CONTACT_ERROR:
        case CONTACT_TYPES.GET_CONTACTS_ERROR:
            return { 
                ...state, 
                isFetching: false, 
                error: payload 
            };

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