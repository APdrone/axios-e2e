// import instance from '../util/http/jsonPlaceholderInstance.js';
// import { expect } from 'chai';
const axios = require('axios');
const chai = require('chai');
const instance = require('../util/http/gitLabInstance');
const expect = chai.expect;

describe('Tests different auth methods', () => {
  it('should be able access resources using basic auth type', async () => {
    const response = await axios({
      method: 'GET',
      url: '/basic-auth',
      baseURL: 'https://postman-echo.com',
      auth: {
        username: 'postman',
        password: 'password',
      },
    });
    expect(response.status).to.equal(200);
    expect(response.data.authenticated).to.equal(true);
  });

  it('should be able access resources using basic auth type-manual', async () => {
    const creds = 'postman:password';
    const auth = Buffer.from(creds).toString('base64');
    const response = await axios({
      method: 'GET',
      url: '/basic-auth',
      baseURL: 'https://postman-echo.com',
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });
    expect(response.status).to.equal(200);
    expect(response.data.authenticated).to.equal(true);
  });

  it('should be able access resources using oauth type', async () => {
    const resToken = await instance({
      method: 'post',
      url: '/oauth/token',
      data: {
        grant_type: 'password',
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        username: process.env.USER_NAME,
        password: process.env.PASSWORD,
      },
    });
    expect(resToken.status).to.equal(200);
    const token = resToken.data.access_token;

    const res = await instance({
      method: 'GET',
      url: 'api/v4/projects',
      headers: {
        Authorization: `bearer ${token}`,
      },
      params: {
        membership: true,
      },
    });

    expect(res.status).to.equal(200);
    const names = res.data.map((project) => project.name);
    expect(names).to.include.members(['freeCodeCamp - GitLab CI', 'Cypress-CI']);
  });
});
