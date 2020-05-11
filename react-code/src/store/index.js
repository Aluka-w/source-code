import reducer from './reducer';
import { createStore, applyMiddleware  } from '../redux';
import { logger, thunk } from '../middleware';

const store = createStore(reducer, applyMiddleware(logger, thunk))

export default store