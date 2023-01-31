const express = require('express');

const path = require('path');
const notesData = require('./db/db.json');
const fs = require('fs');
const util = require('util');
const { randomUUID } = require('crypto');

const PORT = process.env.port || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static('public'));

//Get Router for homepage
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/pages/notes.html'))
);

const readFromfile = util.promisify(fs.readFile);

const writeToFile = (destination, content) =>
    fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
        err ? console.error(err) : console.info(`\nData written to ${destination}`)
    );

const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file, parsedData);
        }
    });
};

//Get route for all the notespage
app.get('/api/notes', (req, res) => {
    console.info(`${req.method} request received for feedback`);

    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`);
  
    const { title, text } = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text,
        new_id: randomUUID(),
      };
  
      readAndAppend(newNote, './db/db.json');
      res.json(`Notes added successfully 🚀`);
    } else {
      res.error('Error in adding tip');
    }
  });


app.listen(PORT, () => {
    console.log(`API server now on port http://localhost:${PORT}`);
});