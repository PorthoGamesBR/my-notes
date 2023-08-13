import React from "react"
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
    return (
        <div className="note">
            <TextArea initValue={noteData.text} onSubmit={(t) => onEdit({...noteData, text:t})} style={textAreaStyle}/>
        </div>
    );
}

export default Note;