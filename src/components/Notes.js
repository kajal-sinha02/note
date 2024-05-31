import React, { useContext, useEffect ,useRef ,useState } from "react";
import noteContext from "../context/notes/noteContext";

import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {

  const [note, setNote] = useState({id:"" ,etitle:"", edescription:"" , etag: "default" });
  const context = useContext(noteContext);
  let navigate = useNavigate();
  
  const { notes, getnotes ,editnote} = context;
  const ref = useRef(null)
  const refClose = useRef(null)

  const updateNote = (currentNote) => {
    ref.current.click() ;
    setNote({id: currentNote._id ,etitle: currentNote.title , edescription :currentNote.description , etag : currentNote.tag });
  };

  const onchange = (e) =>{
      setNote ({...note , [e.target.name] : e.target.value})
  }

  const handleClick = (e) =>{
    console.log("updating note");
    editnote( note.id  , note.etitle , note.edescription , note.etag);
    e.preventDefault();
    refClose.current.click();
  }

  useEffect(() => {
    if(localStorage.getItem('token') !== null){
      getnotes();
    }else{
      navigate('/login');
    }
  });

  return (
    <>
      <AddNote></AddNote>

      <button  ref = {ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content bg-gray-900 text-white">
            <div className="modal-header border-b border-gray-700">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close text-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    value={note.etitle}
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    onChange={onchange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="desc" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    value={note.edescription}
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                    id="edescription"
                    name="edescription"
                    onChange={onchange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="desc" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                    value={note.etag}
                    id="etag"
                    name="etag"
                    onChange={onchange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer border-t border-gray-700">
              <button
                ref={refClose}
                type="button"
                className="btn btn-outline-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-outline-light" onClick={handleClick}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3 justify-content-center">
        <div className="container my-3">
          {notes.length === 0 && 'No notes to display'}
        </div>
      </div>

      <div className="row my-3 justify-content-center">
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} note={note} updateNote={updateNote} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
