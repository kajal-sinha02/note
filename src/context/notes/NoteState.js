import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "https://inote.onrender.com";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);


  //get all notes

  const getnotes= async (e) => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      }
    });
    const json =await response.json() ;
    setNotes(json)  
  };
  //Add a note


  const addnote = async (note) => {
    try {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'),
        },
        body: JSON.stringify({
          title: note.title,
          description: note.description,
          tag: note.tag,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
  
      const json = await response.json();
      console.log(json);
      console.log("Adding a new note");
  
      const newNote = {
        _id: json._id,
        user: json.user,
        title: note.title,
        description: note.description,
        tag: note.tag,
        date: json.date,
        __v: json.__v,
      };
  
      setNotes(notes.concat(newNote));
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };
  




  //delete a note

   // Delete a note
   const deletenote = async (id) => {
    try {
      console.log("Deleting note with ID:", id);
      console.log("API host:", host);
  
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Ensure the correct Content-Type
          "auth-token": localStorage.getItem('token'),
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
  
      const contentType = response.headers.get("content-type");
      let json;
      
      // Check if the response is JSON
      if (contentType && contentType.includes("application/json")) {
        json = await response.json();
      } else {
        const text = await response.text();
        console.log("Response from delete note (text):", text);
        json = { message: text };
      }
  
      console.log("Response from delete note:", json);
  
      // Update the notes state
      const newNotes = notes.filter((note) => note._id !== id);
      setNotes(newNotes);
  
      console.log("Updated notes after deletion:", newNotes);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };
  
  
  

  // edit a note

  // const editnote = async (id, title, description, tag) => {
  //   console.log(title)
  //   console.log( `${host}/api/notes/updatenote/${id}`);
  //   const response = await fetch(
  //     `${host}/api/notes/updatenote/${id}`,
  //     {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "json/application",
  //         "auth-token": localStorage.getItem('token'),
  //       },
  //       body: JSON.stringify({ title, description, tag }),
  //     }
  //   );
  //   const json = await response.json();
  //   console.log(json);
  //   for(let index = 0 ; index <notes.length ; index++){
  //     const element = notes[index] ;
  //     if(element._id === id){
  //       notes[index].title = title;
  //       notes[index].description = description ;
  //       notes[index].tag = tag ;
  //     }
  //     break;
  //   }
  //   setNotes(notes)
  // };

  const editnote = async (id, title, description, tag) => {
    console.log(title);
    console.log(`${host}/api/notes/updatenote/${id}`);
    try {
      const response = await fetch(
        `${host}/api/notes/updatenote/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token'),
          },
          body: JSON.stringify({ title, description, tag }),
        }
      );
      
      if (!response.ok) {
        throw new Error('Failed to update note');
      }
      
      const json = await response.json();
      console.log(json);
      
      // Assuming 'notes' is your array of notes and 'setNotes' is a state setter function
      const updatedNotes = notes.map(note => {
        if (note._id === id) {
          return {
            ...note,
            title,
            description,
            tag
          };
        } else {
          return note;
        }
      });
      
      setNotes(updatedNotes);
      
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };
  

  

  return (
    <NoteContext.Provider value={{ notes, addnote, deletenote, editnote ,getnotes}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
