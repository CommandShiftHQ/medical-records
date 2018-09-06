const express = require('express');
const createMedicalRecord = require('./controllers/createMedicalRecord')
const getMedicalRecord = require('./controllers/getMedicalRecord')
const bodyParser = require('body-parser');

const server = express();

server.use(bodyParser.json());

server.get('/', (req, res) => {
  res.send('Hello world!');
});

server.get('/medical-records/:medicalRecordId', getMedicalRecord);
server.post('/medical-records', createMedicalRecord);

server.listen(3000, () => {
  console.log('listening on 3000');
});
