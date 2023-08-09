import "./NoteContainer.css"

function NoteContainer({children}){

    return <div className="note-container">
        {children}
    </div>
}

export default NoteContainer;