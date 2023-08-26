import TextInput from './components/TextInput';
import NoteContainer from './components/Note/NoteContainer';
import Note from './components/Note/Note';
import NoteHeader from './components/Note/NoteHeader'
import IconButton from './components/IconButton'
import FlexContainer from './components/Containers/FlexContainer';
import Banner from './components/Title/Banner';
import Title from './components/Title/Title';
import FloatingContainer from './components/Containers/FloatingContainer';
import CircleContainer from './components/Containers/CircleContainer';
import ShowOnHover from './components/Containers/ShowOnHover';

import {useState} from "react"
import useNoteList from './utils/CustomHooks/useNotes';

import './App.css';

function App() {
  const [notes, addNote, removeNote, editNote, connection, switchNoteOrder] = useNoteList();

  return (
    <div className="App" style={{backgroundColor: "#fbfbfb"}}>
     <FlexContainer column={true}>
      
        <Banner>
          <Title text={"Note App"} />
        </Banner>
        
        <FloatingContainer>
          <CircleContainer styles={{"padding":"15px 17px", "border":'0', "box-shadow":"1px 1px 2px rgba(0,0,0,0.3"}} >
            <IconButton icon={"✒"} onClick={() => addNote("New Note")} />
          </CircleContainer>
        </FloatingContainer>

        <FlexContainer className={"full-width jc-space-around"}>      
          <FlexContainer column={true} className={"grow-1"}>
            {notes.length < 1 ? <p>No notes to render. Try creating a new one!</p> : (<>
            {notes.map((n) => {
              return (
                <NoteContainer key={n.id}>
                
                {n.order-1 >= 0 ? <ShowOnHover> 
                  <IconButton icon="⬆" onClick={() => switchNoteOrder(n.order,n.order-1)} /> 
                  </ShowOnHover> : <></> }

                <NoteHeader onXClick={() => removeNote(n.id)} /> 
                <Note noteData={n} onEdit={editNote}/>
                {n.order+1 < notes.length ? 
                
                <ShowOnHover>
                  <IconButton icon="⬇" onClick={() => switchNoteOrder(n.order,n.order+1)} />
                </ShowOnHover> : <></> }
                
                </NoteContainer>
            )})}</>)}
          </FlexContainer>
        
        <FlexContainer column={true} >
          {/* Add the rule list here */}
          <h2>Rule List</h2>
          <div>
            <p>
              This system is made for organization. This means that the system itself cannot be unorganized, which would make the whole point of organizing nullified.
            </p>
            <p>
              So there are some rules for the system to work properly. It's not a lot, but they are here. And feel free to change them for your own needs
            </p>
              
            <ul style={{"textAlign":"start"}}>
              <li>Work notes need to have a finish date, and they need to be removed after that finish date.</li>
              <li>If a note is actively being ignored, remove it.</li>
              <li>If you have a motive to ignore it, like you are waiting for something before doing that note, then explain it at the start between {"()"}</li>
              <li>If a note is being jumped over, send it to the end of the list</li>
              <li>Review notes often, as often as you create new ones, so you remove the ones clustering.</li>
              
            </ul>
          </div>  

          </FlexContainer>
        </FlexContainer>
        
          {connection.successful ? <></> : (<div>
          <p>Server not connected, changes are not being saved!</p>
          <input type="button" value="Reconect" onClick={() => connection.lastOperation()} />
          </div>
          )}
        
      </FlexContainer> 
    </div>
  );
}

export default App;
