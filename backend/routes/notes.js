const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

// Route 1 : Get all the notes using Fetch GET "/api/notes/fetchallnotes" login requisre
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error occoured");
  }
});
// Route 2 : add a new notes using POST "/api/notes/addnote" login require
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title min length is 3").isLength({ min: 3 }),
    body("description", "description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      console.log(req.body);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savednotes = await note.save();
      res.json(savednotes);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error occoured");
    }
  }
);

// Route 3 : update notes using POST "/api/notes/updatenote" login require


// router.put("/updatenote/:id",fetchuser,async (req, res) => {
  
//   const { title, description, tag } = req.body;
//   //create a newNote object
//   const newNote = {} ;
//   if(title){newNote.title = title};
//   if(description){newNote.description = description};
//   if(tag){newNote.tag = tag};

//   //find the note to be updated it
//   const note = Note.findById(req.params.id);
//   if(!note){res.status(404).send("Not Found")};
//   if(note.user.toString() !== req.user.id){
//       return res.status(401).send("not allowed");
//   }

//   note = await Note.findByIdAndUpdate(req.params.id , {$set : newNote} , {new:true});
//   res.json({note});

// });

router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    // Create a newNote object
    const newNote = {};
    if (title) newNote.title = title;
    if (description) newNote.description = description;
    if (tag) newNote.tag = tag;

    // Find the note to be updated
    let note = await Note.findById(req.params.id);
    if (!note) return res.status(404).send("Not Found");
    if (note.user.toString() !== req.user.id)
      return res.status(401).send("Not allowed");

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


router.post("/deletenote/:id",fetchuser,async (req, res) => {

  const note = await Note.findById(req.params.id);
if (!note) {
    return res.status(404).send("Not Found");
}
if (note.user.toString() !== req.user.id) {
    return res.status(401).send("Not allowed");
}

await Note.findByIdAndDelete(req.params.id);

// Optionally, you can send a response indicating successful deletion
res.status(200).send("Note deleted successfully");

});
module.exports = router;
