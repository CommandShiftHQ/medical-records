const fs = require('fs');
const path = require('path');
const mocksHttp = require('node-mocks-http');
const getMedicalRecord = require('../controllers/getMedicalRecord');

describe('getMedicalRecord', () => {
  it('creates a medical record', (done) => {
    const record = {
      id: 'abc123',
      name: 'Joe',
      ailments: ['Everything.']
    };

    const req = mocksHttp.createRequest({
      method: 'GET',
      url: '/medical-records/abc123',
      params: {
        medicalRecordId: 'abc123'
      }
    });

    const res = mocksHttp.createResponse({
      eventEmitter: require('events').EventEmitter
    });

    const file = path.join(__dirname, '../records.json');
    fs.writeFileSync(file, JSON.stringify([record]))

    getMedicalRecord(req, res);

    res.on('end', () => {
      expect(res._getData()).toEqual(record);
      done();
    })
  })
})
