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

function handleNoteSave() {

    console.log("save")
}


saveButton.on("click", handleNoteSave);
// noteList.on("click", ".list-group-item", handleNoteView);
// newButton.on("click", handleNewNoteView);
// noteList.on("click", ".delete-note", handleNoteDelete);
noteTitle.on("keyup", saveBtnAppear);
noteText.on("keyup", saveBtnAppear);

// Gets and renders the initial list of notes



//getAndRenderNotes();