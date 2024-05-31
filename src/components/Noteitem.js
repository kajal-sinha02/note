import React from "react";
import { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const Noteitem = (props) => {
  const { note, updateNote } = props;
  const context = useContext(noteContext);
  const { deletenote } = context;

  // Format the date to a more readable format
  const formattedDate = new Date(note.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="col-md-4">
      <div className="card shadow-sm mb-4" style={{ background: "linear-gradient(to right, #4a5568, #2d3748)", color: "white" }}>
        <div className="card-body">
          <h5 className="card-title mb-3" style={{ fontSize: "1.25rem" }}>{note.title}</h5>
          <p className="card-text" style={{ fontSize: "1rem" }}>{note.description}</p>
          <p className="card-text" style={{ fontSize: "0.875rem" }}>Date: {formattedDate}</p>
          <div className="d-flex justify-content-between align-items-center mt-4">
            <div>
              <i
                className="fas fa-trash mx-2"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  deletenote(note._id);
                }}
              ></i>
              <i
                className="fas fa-edit"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  updateNote(note);
                }}
              ></i>
            </div>
            <span className="badge badge-primary" style={{ fontSize: "0.875rem" }}>{note.tag}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
