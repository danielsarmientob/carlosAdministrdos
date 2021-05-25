
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { authReducer } from '../reducers/authReducer';
import { dataActualReducer } from '../reducers/dataActualReducer';
import { personReducer } from '../reducers/personReducer';
import { uiReducer } from '../reducers/uiReducer';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    pe: personReducer,
    dataActual: dataActualReducer  
});
export const store = createStore(
        reducers,
        composeEnhancers(
            applyMiddleware(thunk)
        )
    );