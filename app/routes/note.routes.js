module.exports=(app)=>{
    const notes=require('../controllers/note.controller.js')

    //create a note
    app.post('/notes',notes.create)

    //retrive data
    app.get('/notes/noteslist',notes.findAll);

   /* //retrive single note
    app.get('/notes/:noteId',notes.findOne);

    //update note
    app.put('/notes/:noteId',notes.update);

    //delete note
    app.delete('/notes/:noteId',notes.delete);
 */
}