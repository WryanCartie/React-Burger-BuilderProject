import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-app-b2c53-default-rtdb.firebaseio.com'
});

export default instance;