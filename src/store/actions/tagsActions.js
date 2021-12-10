import { createActions, createReducer } from 'reduxsauce';

const { Types, Creators } = createActions({
    tagsRequest: ['params'],
    tagsSuccess: ['data'],
    tagsFailure: []
});

const INITIAL_STATE = {
    tagsRequest: false,
    tagsSucess: {
        totalCount: 0,
        tags: [],
        nextPage: ''
    },
    tagsFailure: false
}
const onTagsRequests = (state = INITIAL_STATE) => ({ ...state, tagsRequest: true, tagsFailure: false })
const onTagsFailure = (state = INITIAL_STATE) => ({ ...state, tagsRequest: false, tagsFailure: true })

const onTagsSuccess = (state = INITIAL_STATE, { data }) => {
    return {
        tagsRequest: false,
        tagsSucess: { ...data },
        tagsFailure: false
    }
};

const handlers = {
    [Types.TAGS_REQUEST]: onTagsRequests,
    [Types.TAGS_SUCCESS]: onTagsSuccess,
    [Types.TAGS_FAILURE]: onTagsFailure
}

export { Types, Creators };
export default createReducer(INITIAL_STATE, handlers)