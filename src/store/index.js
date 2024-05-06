import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import { composeWithDevTools } from "@redux-devtools/extension";
import createSagaMiddleware from 'redux-saga'

import rootSaga from "../saga";
import contactReducer from "./reducers/contactsReducer";

const sagaMiddleware = createSagaMiddleware();
const middleware = applyMiddleware(sagaMiddleware, logger)

export default createStore(contactReducer, composeWithDevTools(middleware));

sagaMiddleware.run(rootSaga)