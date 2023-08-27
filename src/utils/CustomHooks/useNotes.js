import {useState, useEffect} from "react"
// NOTE: Need to change once database becomes local
const fetchOnlyLocalMachine = false

const source_url = fetchOnlyLocalMachine ? "http://127.0.0.1:5000" : window.location.origin

function createNote(id,text, order) {
    return {id:id, text:text, order:order}
}

function isNote(obj) {
    // Checks if obj contains the data to be considered a note, return true if it is and false + error message if is not;
    let [isNote, message] = [true, ""];

    if (!("id" in obj) || !("text" in obj) || !("order" in obj)) 
    {
        message="Not found Id or Text or Order inside object. Is not a note"
        isNote=false
    }
    else if (!Number.isInteger(obj.id))
    {
        message="Id isn't numeric. Is not a note"
        isNote=false
    }
    else if (!Number.isInteger(obj.order))
    {
        message="Order isn't numeric. Is not a note"
        isNote=false
    }
    else if (!typeof obj.text === 'string')
    {
        message="Text isnt a pure string. Is not a note"
        isNote=false
    }
    return [isNote, message]
}

function getLastNoteId(notes) {
    let lnid = 0;
    for (const n of notes) {
        if (n.id && lnid < n.id) lnid = n.id;
    }
    return lnid;
}

function orderNoteList(noteList) {
    return [...noteList].sort((a,b) => a.order - b.order);
}

function removeGapFromList(notes){
    let lastOrder = 0;
    return orderNoteList(notes).map((n) => {
        let toReturn = n;
        if (n.order > lastOrder) {
            toReturn = {...n, order:lastOrder}
        }
        lastOrder+=1;
        return toReturn;
    })
}

function useNoteList() {
    const [ls, setLs] = useState([]);
    const [connection, setConnection] = useState({successful: false, lastOperation: getNotes});

    // Load data
    useEffect(() => {getNotes()}, [])

    function getNotes() {
        const data_path = "/api/notes"
        const url = source_url + data_path
        let connectSuccess = false;
        fetch(url)
         .then(response => {
            if (response.ok) {
                connectSuccess = true; 
                return response.json()
            }
            else {
                if (response.status === "NO_RESPONSE_CODE") {
                    // No server
                    return Promise.reject(new Error("Server Unavailable"))
                }
            }
        })
        .then(data => {
            for (const d of data) {
                const [isnote, err] = isNote(d);
                if (!isnote) return Promise.reject(new Error(err));    
            }
            setLs(removeGapFromList(data));
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
        const lorder = ls.length
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
            body: JSON.stringify(createNote(lnid, text, lorder))
        })
         .then(response => {
            if(response.ok){
                connectSuccess = true; 
                return response.text()
            }
            else {
                if (response.status === "NO_RESPONSE_CODE") {
                    // No server
                    return Promise.reject(new Error("Server Unavailable"))
                }
            }
            return response.json()
        })
        .then(d =>
            {
                const json = JSON.parse(d);
                if(!Boolean(json['success'])) {
                    console.log("Add operation was not sucessfull.")
                    console.log(json)
                    connectSuccess = false;
                }
                else {
                }
            })
            .catch(err => console.log(err))
            .finally(() => {
                setConnection({successful:connectSuccess, lastOperation: () => addNote(text)});
            })
            
            setLs(removeGapFromList([...ls, createNote(lnid, text, lorder)]));
    }
    
    function deleteNote(id) {
        const remove_path = "/api/delete"
        const url = source_url + remove_path
        let connectSuccess = false;
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({"id":id}),
        }).then(response => {
            if(response.ok){
                connectSuccess = true;
               return response.json(); 
            }

        }).then( d =>
            {
                if(!Boolean(json['success'])) {
                console.log("Delete operation was not sucessfull.")
                console.log(json)
                connectSuccess = false;
            }
        }
        ).catch(err => console.log(err))
        .finally(() => {setConnection({successful:connectSuccess, lastOperation:() => deleteNote(id)});})
        
        setLs(removeGapFromList(ls.filter((n) => n.id !== id)));
    }
    
    function editNote(noteData) {
        const editedNote = createNote(noteData.id, noteData.text, noteData.order)
        // Backend part
        const edit_path = "/api/edit"
        const url = source_url + edit_path
        let connectSuccess = false;
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedNote)
        })
         .then(response => {
            if(response.ok){
                connectSuccess = true; 
                return response.json()
            }
            else {
                if (response.status === "NO_RESPONSE_CODE") {
                    // No server
                    return Promise.reject(new Error("Server Unavailable"))
                }
            }
        })
        .then(d => {
                    if(!Boolean(json['success'])) 
                    {
                        console.log("Edit operation was not sucessfull.")
                        console.log(json)
                        connectSuccess = false;
                    }
                }
            ).catch(error => {
            console.log(error.toString())
            console.log("Was not able to connect to server")
        }).finally(() => {
            setConnection({successful:connectSuccess, lastOperation:() => editNote(noteData)});
        })
        
        // Browser part
        const newList = ls.map((n) => {
            if (n.id === noteData.id) return editedNote
            return n;
        });
        setLs(removeGapFromList(newList));        
    }
    
    function switchNoteOrder(noteOrdA, noteOrdB) {
        const n1 = ls.find((n) => n.order === noteOrdA)
        const n2 = ls.find((n) => n.order === noteOrdB)
        const updatedNotes = [{...n2,order:n1.order},{...n1,order:n2.order}]
        
        // Backend part
        const edit_path = "/api/order"
        const url = source_url + edit_path
        let connectSuccess = false;
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({notes:updatedNotes})
        })
         .then(response => {
            if(response.ok){
                connectSuccess = true; 
                return response.text()
            }
            else {
                if (response.status === "NO_RESPONSE_CODE") {
                    // No server
                    return Promise.reject(new Error("Server Unavailable"))
                }
            }
        })
        .then().catch(error => {
            console.log(error.toString())
            console.log("Was not able to connect to server")
        }).finally(() => {
            setConnection({successful:connectSuccess, lastOperation:() => (switchNoteOrder(noteOrdA,noteOrdB))});
        })

        // Front end part
        const newData = ls.map((n) => {
            if(n.order === n1.order) {
                return updatedNotes[0];
            }else if(n.order === n2.order) {
                return updatedNotes[1];
            }
            return n;
        })
        setLs(removeGapFromList(newData));
    }
    
    return [ls,  addNote, deleteNote, editNote, connection, switchNoteOrder]
}

export default useNoteList;