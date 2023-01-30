const noteTitle = $(".note-title");
const noteText = $(".note-textarea");
const saveButton = $(".save-note");
const newButton = $(".new-note");
const noteList = $(".list-container .list-group");

var userNotes = [];

function saveBtnAppear() {

    if (!noteText.val().trim() || !noteTitle.val().trim()) { 
        
        saveButton.hide(); 
        console.log("button")
    
    }else { saveButton.show(); }

}


// Get notes and title text values, then save it to db file

const getNotes =() => {

    fetch('/api/notes', {
        method: 'GET', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
    })
}

const saveNote =() => {

    fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
    })
}

const deleteNote =() => {

    fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
    })
}

function saveAndRenderNotes () {

const newNote = {

    title: noteTitle.val(),
    text: noteText.val(),
    id: noteList.children().toArray().length
};

}



saveButton.on("click", saveNotes);
// noteList.on("click", ".list-group-item", handleNoteView);
// newButton.on("click", handleNewNoteView);
// noteList.on("click", ".delete-note", handleNoteDelete);
noteTitle.on("keyup", saveBtnAppear);
noteText.on("keyup", saveBtnAppear);

// Gets and renders the initial list of notes



//getAndRenderNotes();