
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { authReducer } from '../reducers/authReducer';
import { personReducer } from '../reducers/personReducer';
import { uiReducer } from '../reducers/uiReducer';
import { archivoElegidoReducer } from '../reducers/archivoElegidoReducer';
import { archivoFiltroReducer } from '../reducers/archivoFiltroReducer';
import { uifReducer } from '../reducers/uifReducer';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    pe: personReducer,
    ae: archivoElegidoReducer,
    uif: archivoFiltroReducer,
    uifd:uifReducer
});
export const store = createStore(
        reducers,
        composeEnhancers(
            applyMiddleware(thunk)
        )
    );