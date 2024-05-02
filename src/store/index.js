import { createStore } from "redux";
import contactReducer from "./reducers/contactsReducer";

export default createStore(contactReducer);