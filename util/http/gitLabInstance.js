// import axios from 'axios';
const axios = require('axios');

const gitLabInstance = axios.create({
  baseURL: 'https://gitlab.com',
  timeout: 10000,
});

module.exports = gitLabInstance;
