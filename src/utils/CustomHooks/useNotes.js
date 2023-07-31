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
    [ls, setLs] = useState([]);
    // Load data
    //useEffect(() => {setLs([createNote(0, "First Note")])},[])

    function addNote(text) {
        const lnid = getLastNoteId(ls);
        setLs([...ls, createNote(lnid, text)]);
    }

    return [ls,  addNote]
}

export default useNoteList;