import { takeLatest } from "redux-saga/effects";
import { CONTACT_TYPES } from "../store/actions/actionTypes";
import {
    getContactsSaga,
    addNewContactSaga,
    updateContactSaga,
    deleteContactSaga,
} from './contactsSaga'

export default function* rootSaga () {
    yield takeLatest(CONTACT_TYPES.GET_CONTACTS_ACTION, getContactsSaga);
    yield takeLatest(CONTACT_TYPES.POST_CONTACT_ACTION, addNewContactSaga);
    yield takeLatest(CONTACT_TYPES.PUT_CONTACT_ACTION, updateContactSaga);
    yield takeLatest(CONTACT_TYPES.DELETE_CONTACT_ACTION, deleteContactSaga);
}