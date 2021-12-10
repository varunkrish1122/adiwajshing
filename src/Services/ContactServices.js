import axios from './api/interceptor';
import qs from 'qs'
class ContactServices {
    getAllContact(params){
        return axios.get('/contacts', {
            params,
        })
    }

    getAllTags(){
        return axios.get('/tags')
    }
};

export default ContactServices