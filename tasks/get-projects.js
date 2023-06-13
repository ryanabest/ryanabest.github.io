const fs = require('fs');
const path = require('path');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const creds = require('../keys.json').google;

async function getData () {
  const doc = new GoogleSpreadsheet('1B_5IGxOWcWEw4CFJy2TknRnTar5bjFVUeDT4yQ2DB-U');
  const data = [];
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo(); // loads document properties and worksheets
  const sheet = doc.sheetsById['0'];
  const rows = await sheet.getRows(); // can pass in { limit, offset }
  const headers = sheet.headerValues;
  rows.forEach((row, i) => {
    const rowData = {};
    headers.forEach((header, h) => {
      rowData[header] = row._rawData[h];
    });
    data.push(rowData);
  });
  return data;
}

getData().then(data => {
  fs.writeFileSync(path.join(__dirname, '/../src/data/projects.json'), JSON.stringify(data, null, 2));
});
