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
    const [ls, setLs] = useState([]);
    const [connection,setConnection] = useState({successful: false, lastOperation: null});

    // Load data
    useEffect(() => {getNotes()},[])

    function getNotes() {
        const data_path = "/api/notes"
        const url = source_url + data_path
        let connectSuccess = false;
        fetch(url)
         .then(response => {
            if(response.ok){
                connectSuccess = true; 
                return response.json()
            }
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
        .catch(error => {
            console.log(error.toString())
            console.log("Was not able to connect to server")
        }).finally(() => {
            setConnection({successful:connectSuccess, lastOperation:getNotes});
        })
        
    }
    
    function addNote(text) {
        const lnid = getLastNoteId(ls)+1;
        
        const data_path = "/api/add"
        const url = source_url + data_path
        let connectSuccess = false;
        fetch(url,{
            method: "POST",
            mode: "cors",
            credentials: "same-origin",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({"id":lnid, "text":text})
        })
         .then(response => {
            if(response.ok){
                connectSuccess = true; 
                return response.text()
            }
            else {
                if (response.status === "NO_RESPONSE_CODE") {
                    // No server
                    console.log("Failed connection to server")
                    return Promise.reject(new Error("Server Unavailable"))
                }
            }
        })
        .then(r => {
            console.log(r)
        })
        .catch(error => {
            console.log(error.toString())
            console.log("Was not able to connect to server")
        }).finally(() => {
            setConnection({successful:connectSuccess, lastOperation: () => addNote(text)});
        })

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

    return [ls,  addNote, deleteNote, editNote, connection]
}

export default useNoteList;