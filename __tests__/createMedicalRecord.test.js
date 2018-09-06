const fs = require('fs');
const path = require('path');
const mocksHttp = require('node-mocks-http');
const createMedicalRecord = require('../controllers/createMedicalRecord');

describe('createMedicalRecord', () => {
  it('creates a medical record', (done) => {
    const record = {
      id: 'abc123',
      name: 'Joe',
      ailments: ['Everything.']
    }

    const req = mocksHttp.createRequest({
      method: 'POST',
      url: '/medical-records',
      body: record
    });

    const res = mocksHttp.createResponse({
      eventEmitter: require('events').EventEmitter
    });

    createMedicalRecord(req, res);

    res.on('end', () => {
      const file = path.join(__dirname, '../records.json');

      fs.readFile(file, 'utf8', (err, contents) => {
        const records = JSON.parse(contents);

        expect(records).toContainEqual(record);
        done();
      });
    })
  })
})
