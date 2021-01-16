const path = require('path');
const express = require('express');
const fs = require('fs')

function readDataFile() {
    const jsonString = fs.readFileSync('./data.json', 'utf8');
    return JSON.parse(jsonString);    
}

// Constants
const PORT = 4200;
const HOST = '0.0.0.0';

// App
const app = express();

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/index.html'));
});

app.get('/data', (req, res) => {
    const data = readDataFile();
    res.json(data);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);