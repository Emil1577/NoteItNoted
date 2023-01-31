const express = require('express');
const path = require('path');
const notes = require('./db/db.json');
const fs = require("fs");
const PORT = process.env.PORT || 3001;
const app = express();


// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.post('/api/notes', (req, res) => {
    // Grab the notes list (this should be updated for every new note and deleted note.)

    res.json(notes);

    let jsonFilePath = path.join(__dirname, "/db/db.json");
    let newNote = req.body;

    // This allows the test note to be the original note.
    let highestId = 99;
    // Created a loop to give an ID per note so we can delete them  
    for (let i = 0; i < notes.length; i++) {
        let newNoteId = notes[i];

        if (newNoteId.id > highestId) {
            // highestId will always be the highest numbered id in the notesArray.
            highestId = newNoteId.id;
        }
    }
        newNote.id = highestId + 1;

        notes.push(newNote)  //Push each new notes to the database
    
    // Then append them
    fs.writeFile(jsonFilePath, JSON.stringify(notes), function (err) {

        if (err) {
            return console.log(err);
        }
        console.log("Your note was saved!");
    });

    res.json(newNote);
});

app.delete("/api/notes/:id", function (req, res) {
    let jsonFilePath = path.join(__dirname, "/db/db.json");
    // request to delete note by id.
    for (let i = 0; i < notes.length; i++) {
  
      if (notes[i].id == req.params.id) {
        // Splice takes i position, and then deletes the 1 note.
        notes.splice(i, 1);
        break;
      }
    }
    // Write the db.json file again.
    fs.writeFileSync(jsonFilePath, JSON.stringify(notes), function (err) {
  
      if (err) {
        return console.log(err);
      } else {
        console.log("Your note was deleted!");
      }
    });
    res.json(notes);
  });

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);