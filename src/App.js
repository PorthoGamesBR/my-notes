import TextInput from './components/TextInput';
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
      {notes.map((n) => {
        return <p>{n}</p>
      })}
    </div>
  );
}

export default App;
