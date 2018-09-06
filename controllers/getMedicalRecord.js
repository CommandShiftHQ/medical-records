const fs = require('fs');
const path = require('path');

const getMedicalRecord = (req, res) => {
  const medicalRecordId = req.params.medicalRecordId;
  const file = path.join(__dirname, '../records.json');

  fs.readFile(file, 'utf8', (err, contents) => {
    const records = JSON.parse(contents);

    const existingRecord = records.find(record => record.id === medicalRecordId);

    res.send(existingRecord);
  });
}

module.exports = getMedicalRecord;
