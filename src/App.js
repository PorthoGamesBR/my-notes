import TextInput from './components/TextInput';
import Note from './components/Note/Note';
import IconButton from './components/IconButton'

import {useState} from "react"
import useNoteList from './utils/CustomHooks/useNotes';
import './App.css';

function App() {
  const [notes, addNote, removeNote, editNote] = useNoteList();

  return (
    <div className="App">
      <div>
        <h2>New Note</h2>
        <IconButton icon={"✒"} onClick={() => addNote("New Note")} />

      </div>
      {notes.map((n) => {
        return <Note key={n.id} noteData={n} onEdit={editNote}/>
      })}

    </div>
  );
}

export default App;
