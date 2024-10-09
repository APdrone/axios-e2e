// import Mocha from 'mocha';
// import fs from 'fs';
// import path from 'path';

require('dotenv').config();
const Mocha = require('mocha');
const fs = require('fs');
const path = require('path');

const TEST_DIR = './test';

const mocha = new Mocha({
  reporter: 'mochawesome',
  timeout: 10000,
});

const getTestPaths = (dir) => {
  const files = fs.readdirSync(dir);
  const fileList = [];

  files.forEach((file) => {
    fileList.push(path.join(dir, file));
  });
  return fileList;
};

getTestPaths(TEST_DIR).forEach((file) => {
  mocha.addFile(path.join(file));
});

mocha.run((failures) => {
  process.exitCode = failures ? 1 : 0;
});
