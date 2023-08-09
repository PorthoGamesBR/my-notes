import {useState, useEffect} from "react"
// NOTE: Need to change once database becomes local
const source_url = "http://127.0.0.1:5000"

function createNote(id,text) {
    return {id:id, text:text}
}

function isNote(obj) {
    // Checks if obj contains the data to be considered a note, return true if it is and false + error message if is not;
    let [isNote, message] = [true, ""];

    if (!("id" in obj) || !("text" in obj)) 
    {
        message="Not found Id or Text inside object. Is not a note"
        isNote=false
    }
    else if (!Number.isInteger(obj.id))
    {
        message="Id isn't numeric. Is not a note"
        isNote=false
    }
    else if(!typeof obj.text === 'string') {
        message="Text isnt a pure string. Is not a note"
        isNote=false
    }
    return [isNote, message]
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
    useEffect(() => {
        fetch(url)
         .then(response => {
            if(response.ok) return response.json()
            else {
                if (response.status === "NO_RESPONSE_CODE") {
                    // No server
                    console.log("Failed connection to server")
                    return Promise.reject(new Error("Server Unavailable"))
                }
            }
        })
         .then(data => {
            for(const d of data) {
                const [isnote, err] = isNote(d);
                if (!isnote) return Promise.reject(new Error(err));    
            }
            setLs(data);
         })
         .catch(error => {console.log(error)})
        },[])

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