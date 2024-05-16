import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from '../../api/contacts-service';
import { contactsState } from "../../model/initialState";
import { CONTACT_SLICE_NAME } from "../../constants/constants";

const initialState = {
    contacts: contactsState,
    editingContact: createEmptyContact(),
    isFetching: false,
    error: null,
};

export const getContacts = createAsyncThunk(
    `${CONTACT_SLICE_NAME}/getMovies`,
    async (_, {rejectWithValue}) => {
        try {
            const response = await api.get(`/${CONTACT_SLICE_NAME}/`);
            if(response.status >= 400){
                throw new Error(`Error with getting contacts. Error status is ${response.status}`);
            }
            return response.data;
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const createContact = createAsyncThunk(
    `${CONTACT_SLICE_NAME}/createContact`,
    async (contact, {rejectWithValue, dispatch}) => {
        try {
            const response = await api.post(`/${CONTACT_SLICE_NAME}/`, contact);
            if(response.status >= 400) {
                throw new Error(`Can not create contact. Error status is ${response.status}.`);
            };
            dispatch(makeContact(response.data))
        } catch (error) {
            return rejectWithValue(error.message);
        }
    } 
);

export const deleteContact = createAsyncThunk(
    `${CONTACT_SLICE_NAME}/deleteContact`,
    async (contactId, {rejectWithValue, dispatch}) => {
        try {
            const response = await api.delete(`/${CONTACT_SLICE_NAME}/${contactId}`);
            if(response.status >= 400) {
                throw new Error(`Failed to delete contact. Error status is ${response.status}.`);
            };
            dispatch(removeContact(contactId));
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const editContact = createAsyncThunk(
    `${CONTACT_SLICE_NAME}/editContact`,
    async (contact, {rejectWithValue, dispatch}) => {
        try {
            const response = await api.put(`/${CONTACT_SLICE_NAME}/${contact.id}`, contact);
            if(response.status >= 400) {
                throw new Error(`Failed to update contact. Error status is ${response.status}.`);
            };
            dispatch(changeContact(response.data));
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

const setFetching = (state) => {
    state.isFetching = true; 
    state.error = null;
}

const setError = (state, { payload }) => {
    state.isFetching = false;
    state.error = payload;
}

const contactSlice = createSlice({
    name: CONTACT_SLICE_NAME,
    initialState,
    reducers: {

        makeContact(state, { payload }) {
            state.contacts.push(payload)
        },

        removeContact(state, { payload }) {
            state.contacts = [
                ...state.contacts.filter((contact) => contact.id !== payload)
            ];
            state.editingContact = createEmptyContact();
        },

        changeContact(state, { payload }) {
            state.contacts = state.contacts.map((contact) =>
                contact.id === payload.id ? payload : contact
            );
        },

        addNewContact(state) {
            state.editingContact = createEmptyContact();
        },
        
        selectContact(state, { payload }) {
            state.editingContact = payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fulfilled
            .addCase(getContacts.fulfilled, (state, { payload }) => {
                state.isFetching = false;
                state.error = null;
                state.contacts = payload;
            })
            .addCase(createContact.fulfilled, (state) => {
                state.isFetching = false;
                state.error = null;
            })
            .addCase(deleteContact.fulfilled, (state) => {
                state.isFetching = false;
                state.error = null;
            })
            .addCase(editContact.fulfilled, (state) => {
                state.isFetching = false;
                state.error = null;
            })

            // Pending
            .addCase(getContacts.pending, setFetching)
            .addCase(createContact.pending, setFetching)
            .addCase(deleteContact.pending, setFetching)
            .addCase(editContact.pending, setFetching)

            // Error
            .addCase(getContacts.rejected, setError)
            .addCase(createContact.rejected, setError)
            .addCase(deleteContact.rejected, setError)
            .addCase(editContact.rejected, setError)
    }
})

const { actions, reducer } = contactSlice;

const { makeContact, removeContact, changeContact } = actions;

export const { addNewContact, selectContact } = actions;

function createEmptyContact () {
    return {
        fName: '',
        lName: '',
        phone: '',
        email: '',
    }
};

export default reducer;