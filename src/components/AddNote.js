import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = () => {
    const context = useContext(noteContext);

    const {addnote} = context ;
    const [note, setNote] = useState({title:"", description:"" , tag: "" });
    

    const onchange = (e) =>{
        setNote ({...note , [e.target.name] : e.target.value})

    }
    const handleClick = (e) =>{
      e.preventDefault();
        addnote(note);
        setNote({ title: "", description: "", tag: "" });
    }
  return (
    <div>
      <h2>Add a note</h2>
       
       <form>
         <div className="mb-3">
           <label htmlFor="title" className="form-label">
             title
           </label>
           <input
             type="text"
             className="form-control"
             id="title"
            value={note.title}
             name = "title"
             aria-describedby="emailHelp"
             onChange={onchange}
           />
           
         </div>
         <div className="mb-3">
           <label htmlFor="desc" className="form-label">
             Description
           </label>
           <input
           value = {note.description}
             type="text"
             className="form-control"
             id="description"
             name = "description"
             
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
             id="tag"
          value={note.tag}
             name = "tag"
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
         <button type="submit" className="btn btn-primary" onClick = {handleClick} disabled={ note.title.length < 5 || note.description.length < 5}>
           Add Note
         </button>
       </form>
    </div>
  )
}

export default AddNote
