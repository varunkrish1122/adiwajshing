import axios from './api/interceptor';
class ContactServices {
    getAllContact(){
        return axios.get('/contacts')
    }

    getAllTags(){
        return axios.get('/tags')
    }
};

export default ContactServices