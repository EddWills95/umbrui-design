const path = require('path');
const express = require('express');
var bodyParser = require('body-parser')
const fs = require('fs')

function readDataFile() {
    const jsonString = fs.readFileSync('./data.json', 'utf8');
    return JSON.parse(jsonString);    
}

function writeFile(data) {
    fs.writeFileSync('./data.json', JSON.stringify({"displayedElements": data}));
}

// Constants
const PORT = 4200;
const HOST = '0.0.0.0';

// App
const app = express();

app.use(bodyParser.json());
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/index.html'));
});

app.get('/data', (req, res) => {
    const data = readDataFile();
    res.json(data);
});

app.post("/data", (req, res) => {
    writeFile(req.body);
    res.status(200);
    res.json({displayedElements: req.body});
})

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);