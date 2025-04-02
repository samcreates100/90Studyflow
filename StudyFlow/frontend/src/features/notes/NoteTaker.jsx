import React, { useState, useEffect } from 'react';
import { db } from '../../firebaseConfig'; // Firestore instance
import { collection, addDoc, query, where, onSnapshot, deleteDoc, doc, serverTimestamp, orderBy } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext'; // To get current user

const NoteTaker = () => {
  const { currentUser } = useAuth();
  const [notes, setNotes] = useState([]);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Firestore collection reference
  const notesCollectionRef = collection(db, 'notes');

  // Effect to fetch notes for the current user
  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      setNotes([]); // Clear notes if user logs out
      return;
    }

    setLoading(true);
    // Query notes belonging to the current user, ordered by creation time
    const q = query(
      notesCollectionRef,
      where('userId', '==', currentUser.uid),
      orderBy('createdAt', 'desc') // Show newest notes first
    );

    // Subscribe to real-time updates
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const userNotes = [];
      querySnapshot.forEach((doc) => {
        userNotes.push({ ...doc.data(), id: doc.id });
      });
      setNotes(userNotes);
      setLoading(false);
      setError('');
    }, (err) => {
      console.error("Error fetching notes: ", err);
      setError('Failed to fetch notes.');
      setLoading(false);
    });

    // Cleanup subscription on unmount or when currentUser changes
    return () => unsubscribe();

  }, [currentUser]); // Rerun effect if currentUser changes

  // Function to add a new note
  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNoteTitle.trim() || !newNoteContent.trim() || !currentUser) {
      setError('Please provide a title and content for the note.');
      return;
    }
    setError('');

    try {
      await addDoc(notesCollectionRef, {
        title: newNoteTitle,
        content: newNoteContent,
        userId: currentUser.uid,
        createdAt: serverTimestamp(), // Use server timestamp
      });
      setNewNoteTitle(''); // Clear form
      setNewNoteContent('');
    } catch (err) {
      console.error("Error adding note: ", err);
      setError('Failed to add note.');
    }
  };

  // Function to delete a note
  const handleDeleteNote = async (noteId) => {
    if (!currentUser) return;
    const noteDocRef = doc(db, 'notes', noteId);
    try {
      await deleteDoc(noteDocRef);
    } catch (err) {
      console.error("Error deleting note: ", err);
      setError('Failed to delete note.');
    }
  };

  return (
    <div>
      <h2>My Notes</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleAddNote}>
        <div>
          <label htmlFor="noteTitle">Title:</label>
          <input
            type="text"
            id="noteTitle"
            value={newNoteTitle}
            onChange={(e) => setNewNoteTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="noteContent">Content:</label>
          <textarea
            id="noteContent"
            value={newNoteContent}
            onChange={(e) => setNewNoteContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Note</button>
      </form>

      <hr />

      <h3>Existing Notes:</h3>
      {loading && <p>Loading notes...</p>}
      {!loading && notes.length === 0 && <p>No notes yet. Add one above!</p>}
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <h4>{note.title}</h4>
            <p>{note.content}</p>
            <small>Created: {note.createdAt?.toDate().toLocaleString()}</small>
            <button onClick={() => handleDeleteNote(note.id)} style={{ marginLeft: '10px' }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteTaker;
