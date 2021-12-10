import axios from './api/interceptor';
import qs from 'qs'
class ContactServices {
    getAllContact(params){
        return axios.get('/contacts', {
            params,
            // paramsSerializer: params => qs.stringify(params, {encode: false, indices: false}, null, { encodeURIComponent: qs.unescape })
        })
    }

    getAllTags(){
        return axios.get('/tags')
    }
};

export default ContactServices