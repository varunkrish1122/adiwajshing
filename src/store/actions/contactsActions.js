import { createActions, createReducer } from 'reduxsauce';

const { Types, Creators } = createActions({
    contactsRequest: ['params'],
    contactsSuccess: ['data'],
    contactsFailure: [],
    updateRequest: ['params'],
    updateSuccess: ['data'],
    updateFailure: []
});

const INITIAL_STATE = {
    contactsRequest: false,
    contactsSucess: {
        totalCount: 0,
        contacts: [],
        nextPage: ''
    },
    contactsFailure: false,
    updateSuccess: false,
    updateFailure: false
}
const onContactsRequests = (state = INITIAL_STATE) => ({ ...state, contactsRequest: true, contactsFailure: false })
const onContactsFailure = (state = INITIAL_STATE) => ({ ...state, contactsRequest: false, contactsFailure: true })

const onContactsSuccess = (state = INITIAL_STATE, { data }) => {
    return {
        ...state,
        contactsRequest: false,
        contactsSucess: { ...data },
        contactsFailure: false
    }
};

const onUpdateRequests = (state = INITIAL_STATE) => ({ ...state, updateRequest: true, updateFailure: false })
const onUpdateFailure = (state = INITIAL_STATE) => ({ ...state, updateRequest: false, updateFailure: true })

const onUpdateSuccess = (state = INITIAL_STATE, { data }) => {
    const {contacts, ...restData} = data;
    const {contacts: prevContacts} = state.contactsSucess;
    return {
        ...state,
        contactsRequest: false,
        contactsSucess: { ...restData, contacts: [...prevContacts, ...contacts] },
        contactsFailure: false
    }
};

const handlers = {
    [Types.CONTACTS_REQUEST]: onContactsRequests,
    [Types.CONTACTS_SUCCESS]: onContactsSuccess,
    [Types.CONTACTS_FAILURE]: onContactsFailure,
    [Types.UPDATE_REQUEST]: onUpdateRequests,
    [Types.UPDATE_SUCCESS]: onUpdateSuccess,
    [Types.UPDATE_FAILURE]: onUpdateFailure
}

export { Types, Creators };
export default createReducer(INITIAL_STATE, handlers)