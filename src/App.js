// src/App.js
import React, { useState, useEffect } from "react";
import { fetchNotes, addNote, deleteNote } from "./api";
import moment from "moment";

function App() {
  const [notes, setNotes] = useState([]);
  const [noteContent, setNoteContent] = useState("");

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const notesData = await fetchNotes();
        setNotes(notesData);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    loadNotes();
  }, []);

  const handleAddNote = async () => {
    if (noteContent.trim()) {
      try {
        const newNote = await addNote(noteContent);
        setNotes([newNote, ...notes]);
        setNoteContent("");
      } catch (error) {
        console.error("Error adding note:", error);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevents a new line in the textarea
      handleAddNote();
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await deleteNote(id);
      setNotes(notes.filter((note) => note.id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-500 flex flex-col items-center">
      {/* Header */}
      <div className="w-full bg-black py-4 flex items-center gap-2 px-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
        </svg>
        <h1 className="text-3xl text-white font-bold">Notes</h1>
      </div>

      {/* Input Section */}
      <div className="w-full max-w-md mt-8 px-4">
        <textarea
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Write a note..."
          className="w-3/4 h-24 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      {/* Notes Container */}
      <div className="w-full max-w-full mt-10 px-4 columns-1 sm:columns-2 md:columns-3 lg:columns-5 gap-4 space-y-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className="break-inside-avoid p-4 bg-white rounded-lg shadow-md border border-gray-200"
          >
            <p className="text-gray-800 mb-2">{note.content}</p>
            <div className="flex justify-between mt-4">
              <p className="text-sm text-gray-500">
                {moment(note.created_at).format('MMMM Do YYYY, h:mm:ss a')}
              </p>
              <button
                onClick={() => handleDeleteNote(note.id)}
                className="text-red-500 hover:text-red-600 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
