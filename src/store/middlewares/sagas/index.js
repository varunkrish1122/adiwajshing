import {all, takeEvery} from 'redux-saga/effects';

import { getContactsData, getTagsData, updateContactsData } from './contactSaga';
import { Types as contactActionTypes } from '../../actions/contactsActions';
import { Types as tagActionTypes } from '../../actions/tagsActions';

export default function* rootSagas() {
  yield all([
    takeEvery(contactActionTypes.CONTACTS_REQUEST, getContactsData),
    takeEvery(contactActionTypes.UPDATE_REQUEST, updateContactsData),
    takeEvery(tagActionTypes.TAGS_REQUEST, getTagsData)
  ]);
}
