import { combineReducers, createStore } from 'redux';
import userReducer from './reducers/user';
import { configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
	user: userReducer,
});

const store = configureStore({
  reducer: rootReducer
})

export default store;
