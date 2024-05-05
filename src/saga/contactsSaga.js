import { put } from "redux-saga/effects";
import api from '../api/contacts-service';
import { 
    getContactsRequest, 
    getContactsError, 
    getContactsSuccess, 
    addNewContactRequest,
    addNewContactSuccess,
    addNewContactError,
    updateContactRequest,
    updateContactSuccess,
    updateContactError,
    deleteContactRequest,
    deleteContactSuccess,
    deleteContactError} from "../store/actions/contactsActions";

export function* getContactsSaga () {
    yield put(getContactsRequest());
    try {
        const contacts = yield api.get('/contacts')
            .then(({ data }) => data);
        yield put(getContactsSuccess(contacts));
    } catch (error) {
        yield put(getContactsError(error));
    }
}

export function* addNewContactSaga ({ payload }) {
    yield put(addNewContactRequest());
    try {
        const newContact = yield api.post('/contacts/', payload)
            .then(({ data }) => data);
        yield put(addNewContactSuccess(newContact));
    } catch (error) {
        put(addNewContactError(error));
    }
}

export function* updateContactSaga ({ payload }) {
    yield put(updateContactRequest());
    try {
        const updatedContact = yield api.put(`/contacts/${payload.id}`, payload)
            .then(({ data }) => data);
        yield put(updateContactSuccess(updatedContact));
    } catch (error) {
        yield put(updateContactError(error));
    }
}

export function* deleteContactSaga ({ payload }) {
    yield put(deleteContactRequest());
    try {
        yield api.delete(`/contacts/${payload}`);
        yield put(deleteContactSuccess(payload));
    } catch (error) {
        yield put(deleteContactError(error));
    }
}