import {combineReducers} from 'redux'
import contactsReducer from '../actions/contactsActions';
import tagsReducer from '../actions/tagsActions';

const rootReducer = combineReducers({
  contactsData: contactsReducer,
  tagsData: tagsReducer
});

export default rootReducer;
