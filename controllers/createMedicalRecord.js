const fs = require('fs');
const path = require('path');

const createMedicalRecord = (req, res) => {
  const record = req.body;
  const file = path.join(__dirname, '../records.json');

  fs.readFile(file, 'utf8', (err, contents) => {
    const records = JSON.parse(contents);

    records.push(record);

    fs.writeFile(file, JSON.stringify(records), (err) => {
      res.send(records);
    });
  });
}

module.exports = createMedicalRecord;
