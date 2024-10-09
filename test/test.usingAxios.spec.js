// import axios from 'axios';
// import { describe, it } from 'mocha';
// import { expect } from 'chai';
const axios = require('axios');
const chai = require('chai');
const expect = chai.expect;

describe('Tests using axios', () => {
  it('should be able to fetch all posts', async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    expect(response.status).to.equal(200);
    expect(response.data).to.be.an('array');
  });

  it('should be able to create a new post', async () => {
    const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
      title: 'New Post',
      body: 'This is the body of the new post',
      userId: 1,
    });

    expect(response.status).to.equal(201);
    expect(response.data.title).to.equal('New Post');
    expect(response.data.body).to.equal('This is the body of the new post');
    expect(response.data.userId).to.equal(1);
  });

  it('should be able to delete a post', async () => {
    const response = await axios.delete('https://jsonplaceholder.typicode.com/posts/1');

    expect(response.status).to.equal(200);
  });

  it('should be able to update a new post', async () => {
    const response = await axios({
      method: 'PUT',
      url: '/posts/1',
      baseURL: 'https://jsonplaceholder.typicode.com',
      data: {
        title: 'New Post test',
        body: 'This is the body of the new post',
        userId: 1,
      },
    });
  });
});
