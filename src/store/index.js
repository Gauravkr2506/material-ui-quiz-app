import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import reducer from "./reducer";

const enhancer = compose();

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
