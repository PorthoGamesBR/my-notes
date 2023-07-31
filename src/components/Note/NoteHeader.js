import IconButton from "../IconButton"

function NoteHeader({onXClick}){
    return (
        <div>
            <IconButton icon={"❌"} onClick={onXClick} />
        </div>
    )    
}

export default NoteHeader;