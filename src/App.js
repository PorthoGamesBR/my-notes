import TextInput from './components/TextInput';
import Note from './components/Note/Note';
import {useState} from "react"
import './App.css';

function App() {
  const [notes, setNotes] = useState([])

  function onNewNoteSubmit(noteText) {
    setNotes([...notes,noteText]);
  }

  return (
    <div className="App">
      <div>
        <h2>New Note</h2>
        <TextInput onSend={onNewNoteSubmit}/>
      </div>

      {notes.map((n, index) => {
        return <Note key={index} noteData={{text:n}}/>
      })}

    </div>
  );
}

export default App;
