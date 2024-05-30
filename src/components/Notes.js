import React, { useContext, useEffect ,useRef ,useState } from "react";

import noteContext from "../context/notes/noteContext";
import Login from "./Login";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {

const {showAlert} = props ;
   
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
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Modal title
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                
              ></button>
            </div>
            <div className="modal-body">

            <form>
         <div className="mb-3">
           <label htmlFor="title" className="form-label">
             title
           </label>
           <input
             type="text"
             value={note.etitle}
             className="form-control"
             id="etitle"
             name = "etitle"
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
             className="form-control"
             id="edescription"
             name = "edescription"
             onChange={onchange}
           />
         </div>
         <div className="mb-3">
           <label htmlFor="desc" className="form-label">
             Tag
           </label>
           <input
             type="text"
             className="form-control"
             value={note.etag}
             id="etag"
             name = "etag"
             onChange={onchange}
           />
           </div>
         <div className="mb-3 form-check">
           <input
             type="checkbox"
             className="form-check-input"
             id="exampleCheck1"
           />
           <label className="form-check-label" htmlFor="exampleCheck1">
             Check me out
           </label>
         </div>
        
       </form>


            </div>
            <div className="modal-footer">
              <button ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleClick}>
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
