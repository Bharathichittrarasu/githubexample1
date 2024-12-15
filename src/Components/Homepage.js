import React, { useState, useEffect } from 'react';
import './Homepage.css'; 


const Homepage = () => {
  // Step 1: Initialize the state for notes
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState(''); // For adding new note
  const [editingNote, setEditingNote] = useState(null); // For editing note
  const [editValue, setEditValue] = useState(''); // For updated note value

  // Step 2: Initialize the useEffect hook to load notes from localStorage if available
  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(storedNotes);
  }, []);

  // Step 3: Save the notes to localStorage whenever notes state changes
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  // Step 4: Create (Add new note)
  const handleAddNote = (e) => {
    e.preventDefault();
    if (newNote.trim() !== '') {
      setNotes([...notes, { id: Date.now(), text: newNote }]);
      setNewNote('');
    }
  };

  // Step 5: Edit (Update an existing note)
  const handleEditNote = (note) => {
    setEditingNote(note.id);
    setEditValue(note.text);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setNotes(notes.map((note) =>
      note.id === editingNote ? { ...note, text: editValue } : note
    ));
    setEditingNote(null);
    setEditValue('');
  };

  // Step 6: Delete (Remove a note)
  const handleDeleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div>
      <h2>CRUD App with React</h2>

      {/* Create: Add New Note */}
      <form onSubmit={handleAddNote}>
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Enter a new note"
        />
        <button type="submit">Add Note</button>
      </form>

      {/* Read: Display List of Notes */}
      <h3>Notes List</h3>
      <ul>
        {notes.map((note) => (
          <li key={note.id} className='table_list'>
            {editingNote === note.id ? (
              <div>
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
                <button onClick={handleSaveEdit}>Save</button>
                <button onClick={() => setEditingNote(null)}>Cancel</button>
              </div>
            ) : (

              <div >
                <div >
                {note.text}
                </div>
                <div>
                <button onClick={() => handleEditNote(note)}>Edit</button>
                <button onClick={() => handleDeleteNote(note.id)}>Delete</button>

                </div>

               
                
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Homepage;

