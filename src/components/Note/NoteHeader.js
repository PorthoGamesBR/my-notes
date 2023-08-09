import IconButton from "../IconButton"

import "./NoteHeader.css"

function NoteHeader({onXClick}){
    return (
        <div className="note-header">
            <IconButton icon={"❌"} onClick={onXClick} />
        </div>
    )    
}

export default NoteHeader;