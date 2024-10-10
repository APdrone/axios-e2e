// import instance from '../util/http/jsonPlaceholderInstance.js';
// import { expect } from 'chai';
const axios = require('axios');
const chai = require('chai');
const instance = require('../util/http/jsonPlaceholderInstance');
const expect = chai.expect;
const chaiJsonSchema = require('chai-json-schema');

chai.use(chaiJsonSchema);

describe.only('Tests using axios-chai', () => {
  it('validate using value assertions', async () => {
    const res = {
      id: 2,
      value: 'userOne',
      range: [1, 2, 3, 4],
      obj: { name: 'John', age: 25 },
    };

    //primitive types
    expect(res.id).to.equal(2);
    expect(res.value).to.equal('userOne', 'values are not same');

    //array
    expect(res.range).to.include(2);
    expect(res.range).to.have.lengthOf(4);
  });

  it('validate using data type assertions', async () => {
    const res = {
      id: 2,
      value: 'userOne',
      range: [1, 2, 3, 4],
      obj: { name: 'John', age: 25 },
    };

    //type
    expect(res).to.be.an('object');
    expect(res.id).to.be.a('number');
    expect(res.range).to.be.an('array');

    //presence of property
    expect(res).to.have.property('value');
  });
  it('validate using boolean null undefined assertions', async () => {
    const res = {
      id: 2,
      value: 'userOne',
      range: [1, 2, 3, 4],
      obj: { name: 'John', age: 25 },
      password: null,
      isCheck: false,
    };

    //exist--> not null or undefined
    expect(res.id).to.exist;
    expect(res.password).not.to.exist;

    //null
    expect(res.password).to.be.null;

    //undefined
    // expect(res.password).to.be.undefined;

    //boolean
    expect(res.isCheck).to.be.false;
    expect(res.isCheck).not.to.be.true;
  });
  it('validate using object member assertions', async () => {
    const res = {
      id: 2,
      value: 'userOne',
      range: [1, 2, 3, 4],
      obj: { name: 'Oliver', age: 40 },
    };

    //equality
    expect(res.obj).to.deep.equal({ name: 'Oliver', age: 40 });
    expect(res.obj).to.eql({ name: 'Oliver', age: 40 });

    //check property
    expect(res.obj).to.have.property('name');

    //keys
    expect(res.obj).to.have.keys('name', 'age');
    //any
    expect(res.obj).to.have.any.keys('names', 'age');
  });
  it('validate using exceptions assertions', async () => {
    const badFn = () => {
      throw new TypeError('illegal salmon!');
    };

    expect(badFn).to.throw();
    expect(badFn).to.throw(TypeError);
    expect(badFn).to.throw(Error, 'illegal salmon!');
  });
  it('validate using chai plugins', async () => {
    const user = { name: 'Olive', age: 30 };
    const userSchema = {
      $schema: 'http://json-schema.org/draft-04/schema#',
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        age: {
          type: 'integer',
        },
      },
      required: ['name', 'age'],
    };

    expect(user).to.be.jsonSchema(userSchema);
  });
});
