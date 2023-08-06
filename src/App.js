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
        <h2>Rule List</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis euismod dolor sed dapibus ornare. Suspendisse mollis nibh vitae nisl efficitur, ut facilisis orci consectetur. Nunc nec accumsan metus, id dapibus ante. In hac habitasse platea dictumst. Nullam iaculis congue dolor, a bibendum eros feugiat vitae. Ut malesuada est sed enim eleifend sollicitudin. Aenean cursus lectus eget neque semper, in placerat lectus sagittis. Aenean cursus convallis viverra.

          <ul>
            <li>Lorem ipsum dolor sit amet, consectetur  adipiscing elit.</li>
            <li>Quisque commodo arcu finibus eros malesuada lobortis.</li>
            <li>Maecenas feugiat enim ac est suscipit, non vehicula erat laoreet.</li>
            <li>Morbi iaculis tortor in libero placerat, vel maximus augue vestibulum.</li>
            <li>Nullam pulvinar purus ac risus mollis vestibulum.</li>
          </ul>
        </p>
        
        </FlexContainer>
      </FlexContainer>
    </div>
  );
}

export default App;
