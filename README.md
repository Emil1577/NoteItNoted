# NoteItNoted

## Decription

NoteItNoted is Note Taker app.  This app allows you to create and save notes.  You also have the ability to delete previous notes.
Feel free to share with your friends and family.

## Installation Instructions

Open your browser and click on the link this https://noteitnoted-app.herokuapp.com.  

## Table Of Contents

1. [Webpage Screenshot](#webpage-screenshots)
2. [Code Snippets](#code-snippets)
3. [How to use:](#how-to-use)
4. [My Contact Information](#my-contact-information)

## Webpage Screenshots:

<img width="1278" alt="Screen Shot 2023-01-30 at 11 38 52 PM" src="https://user-images.githubusercontent.com/119825000/215696417-ef53cc34-ced6-42e2-b9a2-3bfbb656a8a9.png">

<img width="1278" alt="Screen Shot 2023-01-30 at 11 39 34 PM" src="https://user-images.githubusercontent.com/119825000/215696553-b0434694-ab10-4648-b307-29fc7640c837.png">

## Code Snippets: 

### Setting my routes

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



    
### Created a for loop function to provide id for each notes typed in by the user.

      let jsonFilePath = path.join(__dirname, "/db/db.json");
      let newNote = req.body;

      // This allows the test note to be the original note.
      let highestId = 99;
      // Created a loop to give an ID per note so we can delete them  
      for (let i = 0; i < notes.length; i++) {
          let newNoteId = notes[i];

          if (newNoteId.id > highestId) {

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



### Function to delete and target a specific note.

      app.delete("/api/notes/:id", function (req, res) {
          let jsonFilePath = path.join(__dirname, "/db/db.json");
          // request to delete note by id.
          for (let i = 0; i < notes.length; i++) {

            if (notes[i].id == req.params.id) {
              notes.splice(i, 1);
              break;
            }
          }
          // write new arrays
          fs.writeFileSync(jsonFilePath, JSON.stringify(notes), function (err) {

            if (err) {
              return console.log(err);
            } else {
              console.log("Your note was deleted!");
            }
          });
          res.json(notes);
        });

      
## How to use:

Open your browser and click on the link https://noteitnoted-app.herokuapp.com/.  When you open the app it will bring you to the "Get Started" page.  When you click "Get Started" this willl bring to a Note Taker page.  There is two text areas.  One is the Note Title which you write the title of you notes.  The other is your text. Upon typing in both areas, the save icon button will appear.  This will allow you to save you notes.  Upon saving, your notes will appear on the left side of the page. You can also delete the notes by clicking the trashcan icon.  If you want to read the notes you previously wrote, just click on the text.  If you want to add more notes, just click on the "+" button. This app was uploaded using Heroku. 


## My Contact Information:

* [My LinkedIn](https://www.linkedin.com/in/emil-ronquillo-76832a32/)
* [My Github](https://github.com/Emil1577)
* [My Email](mailto:emilronquillo@gmail.com)

## Thank you for stopping by. 

Special thanks to all my Instructor, tutors and my colleagues
