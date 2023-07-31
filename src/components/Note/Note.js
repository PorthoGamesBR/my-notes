import React from "react"
import "./Note.css"

import TextArea from "../TextArea"

function Note({noteData}) {
    const {text} = noteData;
    return (
        <div className="note">
            <p>{text}</p>
        </div>
    );
}

export default Note;