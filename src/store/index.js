import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import { composeWithDevTools } from "@redux-devtools/extension";

import contactReducer from "./reducers/contactsReducer";

const middleware = applyMiddleware(logger)

export default createStore(contactReducer, composeWithDevTools(middleware));