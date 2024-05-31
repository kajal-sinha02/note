import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = () => {
    const context = useContext(noteContext);

    const { addnote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    const handleClick = (e) => {
        e.preventDefault();
        addnote(note);
        setNote({ title: "", description: "", tag: "" });
    }

    return (
        <div className="container ">
            <div style={{height : "30px"}}></div> 
            <h2 className="text-2xl font-semibold mb-4" style={{color:"white"}}>Add a Note</h2>
            <form>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-white mb-1">Title</label>
                    <input
                        type="text"
                        className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                        id="title"
                        value={note.title}
                        name="title"
                        aria-describedby="emailHelp"
                        onChange={onchange}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-white mb-1">Description</label>
                    <input
                        type="text"
                        className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                        id="description"
                        value={note.description}
                        name="description"
                        onChange={onchange}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="tag" className="block text-white mb-1">Tag</label>
                    <input
                        type="text"
                        className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                        id="tag"
                        value={note.tag}
                        name="tag"
                        onChange={onchange}
                    />
                </div>
                
                <button
                    type="submit"
                    className="btn btn-dark"
                    onClick={handleClick}
                    disabled={note.title.length < 5 || note.description.length < 5}
                >
                    Add Note
                </button>
            </form>
        </div>
    )
}

export default AddNote
