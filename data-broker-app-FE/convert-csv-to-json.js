//https://www.npmjs.com/package/csv-parser
const csv = require('csv-parser')
const fs = require('fs')
const results = [];

fs.createReadStream('DataBrokers.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      fs.writeFileSync("./data-brokers.json", JSON.stringify(results, null, 2));
    });