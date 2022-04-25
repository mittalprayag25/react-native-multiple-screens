import axios from 'axios';

const base = 'https://hacker-news.firebaseio.com/';

const getServer = () => base;

const Axios = axios.create({
  baseURL: getServer(),
});
export default Axios;
