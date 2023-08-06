import TextInput from './components/TextInput';
import Note from './components/Note/Note';
import IconButton from './components/IconButton'
import NoteHeader from './components/Note/NoteHeader'
import FlexContainer from './components/Containers/FlexContainer';

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
      <FlexContainer className={"full-width jc-space-around"}>      
        <FlexContainer column={true} className={"grow-1"}>
          {notes.length < 1 ? <p>No notes to render. Try creating a new one!</p> : (<>
          {notes.map((n) => {
            return (
            <div key={n.id}>
              <NoteHeader onXClick={() => removeNote(n.id)} /> 
              <Note noteData={n} onEdit={editNote}/>
            </div>)
          })}</>)}
        </FlexContainer>
        <FlexContainer column={true} className={"grow-1"}>
        {/* Add the rule list here */}
        <h2></h2>
        </FlexContainer>
      </FlexContainer>
    </div>
  );
}

export default App;
