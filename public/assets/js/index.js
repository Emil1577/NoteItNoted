const noteTitle = $(".note-title");
const noteText = $(".note-textarea");
const saveButton = $(".save-note");
const newButton = $(".new-note");
const noteList = $(".list-container .list-group");

var userNotes = [];

const tipForm = document.getElementById('tip-form');
const tipsContainer = document.getElementById('tip-container');


// need to read the json data first 

function saveBtnAppear() {

  if (!noteText.val().trim() || !noteTitle.val().trim()) {

    saveButton.hide();
    console.log("button")

  } else { saveButton.show(); }

}





const getNotes = () =>
  fetch('api/notes', {
    method: 'GET', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    //body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
      console.error('Error:', error);
    });

const postNote = (note) =>
  fetch('api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
    
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data);
      createCard(note);
    })
    .catch((error) => {
      console.error('Error:', error);
    });

    // When the page loads, get all the tips
//getNotes().then((data) => data.forEach((note) => createCard(note)));


const handleFormSubmit = (e) => {
  e.preventDefault();
  console.log('Form submit invoked');

  // Get the value of the tip and save it to a variable
  const noteTitle = $(".note-title").val();
  console.log(noteTitle);

  // get the value of the username and save it to a variable
  const noteText = $(".note-textarea").val().trim();

  // Create an object with the tip and username
  const newNote = {
    title: noteTitle,
    text: noteText,
  };

  // Make a fetch POST request to the server
  postNote(newNote);
};

//saveButton.addEventListener('click', handleFormSubmit);

saveButton.on("click", handleFormSubmit);
// noteList.on("click", ".list-group-item", handleNoteView);
// newButton.on("click", handleNewNoteView);
// noteList.on("click", ".delete-note", handleNoteDelete);
noteTitle.on("keyup", saveBtnAppear);
noteText.on("keyup", saveBtnAppear);

// Gets and renders the initial list of notes



