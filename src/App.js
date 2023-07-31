import TextInput from './components/TextInput';
import Note from './components/Note/Note';

import {useState} from "react"
import useNoteList from './utils/CustomHooks/useNotes';
import './App.css';

function App() {
  const [notes, addNote] = useNoteList();

  return (
    <div className="App">
      <div>
        <h2>New Note</h2>
        <TextInput onSend={addNote}/>
      </div>

      {notes.map((n, index) => {
        return <Note key={index} noteData={n}/>
      })}

    </div>
  );
}

export default App;
