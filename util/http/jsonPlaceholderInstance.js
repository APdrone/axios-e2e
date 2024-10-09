// import axios from 'axios';
const axios = require('axios');

const jsplaceholderInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
});

module.exports = jsplaceholderInstance;
