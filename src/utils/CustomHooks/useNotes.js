import {useState, useEffect} from "react"
// NOTE: Need to change once database becomes local
const source_url = "http://127.0.0.1:5000"

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
    const data_path = "/api/notes"
    const url = source_url + data_path
    const [ls, setLs] = useState([]);
    // Load data
    //useEffect(() => {setLs([createNote(0, "First Note")])},[])

    function addNote(text) {
        const lnid = getLastNoteId(ls)+1;
        setLs([...ls, createNote(lnid, text)]);
    }

    function deleteNote(id) {
        setLs(ls.filter((n) => n.id !== id));
    }

    function editNote(id, text) {
        const newList = ls.map((n) => {
            if (n.id === id) return createNote(id, text)
            return n;
        });
        setLs(newList);        
    }

    return [ls,  addNote, deleteNote, editNote]
}

export default useNoteList;