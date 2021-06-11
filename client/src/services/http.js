import axios from 'axios';
import Constants from '../constants';

axios.defaults.baseURL = Constants.serverUrl;

class Http {

    get = (url) => {
        return axios.get(url);
    }

    post = (url, item) => {
        return axios.post(url, item);
    }

    patch = (url, item) => {
        return axios.patch(url, item);
    }

    delete = (url) => {
        return axios.delete(url);
    }

}

const HttpService = new Http();

export default HttpService;
