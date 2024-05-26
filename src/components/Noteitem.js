import React from "react";
import { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const Noteitem = (props) => {
  const {note ,updateNote} = props;

  const context = useContext(noteContext);

  const {deletenote ,editnote} = context ;
  return (
    <div className="col-md-3">
    <div className="card my-3">
      <div className="card-body">
        <h5 className="card-title" style={{ padding: "2px" }}>
          {note.title}
          <i className="fa-solid fa-trash" style={{ padding: "2px" }} onClick={()=>{
            deletenote(note._id)
          }}></i>
          <i className="fa-solid fa-pen-to-square" onClick={()=>{updateNote(note)}}></i>
        </h5>
      </div>
      <p className="card-text" style={{ padding: "20px" }}>
        {note.description}
      </p>
    </div>
    </div>
  );
};

export default Noteitem;
