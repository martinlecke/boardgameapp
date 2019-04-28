import { combineReducers } from 'redux';
import test from './testReducer';
import auth from './authReducer';


export default combineReducers({ test, auth });

