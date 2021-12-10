import { call, put } from 'redux-saga/effects';

import { Types as contactsActionTypes } from '../../actions/contactsActions';
import { Types as tagActionTypes } from '../../actions/tagsActions';
import ContactServices from '../../../Services/ContactServices';

export function* getContactsData({params}) {
    try {
        const { data } = yield call(new ContactServices().getAllContact, params);
        yield put({
            type: contactsActionTypes.CONTACTS_SUCCESS,
            data
        })
    } catch (error) {
        yield put({
            type: contactsActionTypes.CONTACTS_FAILURE,
        })
    }
}
export function* updateContactsData({params}) {
    try {
        const { data } = yield call(new ContactServices().getAllContact, params);
        yield put({
            type: contactsActionTypes.UPDATE_SUCCESS,
            data
        })
    } catch (error) {
        yield put({
            type: contactsActionTypes.UPDATE_FAILURE,
        })
    }
}
export function* getTagsData() {
    try {
        const { data } = yield call(new ContactServices().getAllTags);
        yield put({
            type: tagActionTypes.TAGS_SUCCESS,
            data
        })
    } catch (error) {
        yield put({
            type: tagActionTypes.TAGS_FAILURE,
        })
    }
}