import {useState, useEffect} from "react"

function createNote(id,text) {
    return {id:id, text:text}
}

function getLastNoteId(notes) {
    let lnid = 0;
    for(const n of notes) {
        if (n.id && lnid < n.id) lnid = n.id;
    }
    return lnid;
}

function useNoteList() {
    const [ls, setLs] = useState([]);
    // Load data
    //useEffect(() => {setLs([createNote(0, "First Note")])},[])

    function addNote(text) {
        const lnid = getLastNoteId(ls)+1;
        setLs([...ls, createNote(lnid, text)]);
    }

    function deleteNote(id) {
        setLs(ls.filter((n) => n.id != id));
    }

    return [ls,  addNote, deleteNote]
}

export default useNoteList;