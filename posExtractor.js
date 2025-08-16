// posExtractor.js

const fs = require('fs');
const xml2js = require('xml2js');

const xmlFilePath = './Poems_XML/allPoems.XML';  // updated path to XML file
const outputFilePath = './posList.json';

fs.readFile(xmlFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error(`Error reading ${xmlFilePath}:`, err);
    return;
  }

  const parser = new xml2js.Parser();
  parser.parseString(data, (parseErr, result) => {
    if (parseErr) {
      console.error('Error parsing XML:', parseErr);
      return;
    }

    const posSet = new Set();

    // Recursive walk to find all <token> elements and their pos attribute
    function walk(obj) {
      if (typeof obj === 'object' && obj !== null) {
        for (const key in obj) {
          if (key === 'seg' && Array.isArray(obj[key])) {
            obj[key].forEach(seg => {
              if (seg.$ && seg.$.pos) {
                posSet.add(seg.$.pos.toLowerCase());
              }
            });
          }
          walk(obj[key]);
        }
      }
    }


    walk(result);

    const sortedPOS = [...posSet].sort();

    fs.writeFile(outputFilePath, JSON.stringify(sortedPOS, null, 2), writeErr => {
      if (writeErr) {
        console.error(`Error writing ${outputFilePath}:`, writeErr);
        return;
      }
      console.log(`Extracted ${sortedPOS.length} unique POS tags to ${outputFilePath}`);
    });
  });
});
