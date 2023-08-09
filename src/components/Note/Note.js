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
    const {id, text} = noteData;
    return (
        <div className="note">
            <TextArea initValue={text} onSubmit={(t) => onEdit(id, t)} style={textAreaStyle}/>
        </div>
    );
}

export default Note;