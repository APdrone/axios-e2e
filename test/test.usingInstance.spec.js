// import instance from '../util/http/jsonPlaceholderInstance.js';
// import { expect } from 'chai';
const axios = require('axios');
const chai = require('chai');
const instance = require('../util/http/jsonPlaceholderInstance');
const expect = chai.expect;

describe('Tests using axios', () => {
  it('should be able to fetch all posts', async () => {
    const response = await instance({
      method: 'GET',
      url: '/posts',
    });
    expect(response.status).to.equal(200);
    expect(response.data).to.be.an('array');
    expect(response.data.length).to.be.greaterThan(0);
  });

  it('should be able to create a new post', async () => {
    const response = await instance.post('/posts', {
      title: 'New Post',
      body: 'This is the body of the new post',
      userId: 1,
    });

    expect(response.status).to.equal(201);
    expect(response.data).to.include({
      title: 'New Post',
      body: 'This is the body of the new post',
      userId: 1,
    });
  });

  it('should be able to delete a post', async () => {
    const response = await instance.delete('/posts/1');
    expect(response.status).to.equal(200);
  });
});
