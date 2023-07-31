import React from "react"
import "./Note.css"

import TextArea from "../TextArea"

function Note({noteData, onEdit}) {
    const {id, text} = noteData;
    return (
        <div className="note">
            <TextArea initValue={text} onSubmit={(t) => onEdit(id, t)} />
        </div>
    );
}

export default Note;