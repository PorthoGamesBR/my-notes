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
      <TextInput onSend={onNewNoteSubmit}/>
      
      {notes.map((n, index) => {
        return <Note key={index} noteData={{text:n}}/>
      })}
      
    </div>
  );
}

export default App;
