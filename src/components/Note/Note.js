import {React, useState} from "react"
import "./Note.css"

import TextArea from "../TextArea"

const textAreaStyle = {
    "border" : "none",
    "outline" : "none",
    "width": "100%",
    "height": "100%",
    "background": "transparent",
}

function Note({noteData, onEdit}) {
    const [isSaved, setIsSaved] = useState(true)
    
    function saveNote(noteData) {
        setIsSaved(true);
        onEdit(noteData);
    }

    function notEditedStyle(style)
    {
        return {
            ...style,
            "color": (isSaved ? "" : "grey")
        }
    }
    
    return (
        <div className={"note"}>
            <TextArea initValue={noteData.text} onSubmit={(t) => saveNote({...noteData, text:t})} onValueChange={() => setIsSaved(false)} style={notEditedStyle(textAreaStyle)}/>
        </div>
    );
}

export default Note;