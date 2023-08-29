import {useState, useEffect} from "react"
// NOTE: Need to change once database becomes local
const fetchOnlyLocalMachine = false

const source_url = fetchOnlyLocalMachine ? "http://127.0.0.1:5000" : window.location.origin

function createNote(id,text, order) {
    return {id:id, text:text, order:order}
}

function checkPartsOfObject(obj, parts) {
    const toReturn = {hasParts:true, missingPart:""}
    for (const p of parts) {
        if (!(p in obj)) {
            toReturn.hasParts = false
            toReturn.missingPart = p
            return toReturn
        }
    }
    return toReturn
}

function isNote(obj) {
    // Checks if obj contains the data to be considered a note, return true if it is and false + error message if is not;
    let [isNote, message] = [true, ""];

    function setErrorMessage(err) {
        isNote = false
        message = err + ". Is not a note"
    }

    const checkParts = checkPartsOfObject(obj, ["id","text","order"])
    if (!checkParts.hasParts)
        setErrorMessage("Not found " + checkParts.missingPart + " inside object") 
    else {
        if (!Number.isInteger(obj.id))
            setErrorMessage("Id isn't numeric")
        else if (!Number.isInteger(obj.order))
            setErrorMessage("Order isn't numeric")
        else if (!typeof obj.text === 'string')
            setErrorMessage("Text isn't a pure string")
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

function getPostRequestObj(reqBody) {
    return {
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: reqBody
    }
}

// this function checks if the server is connected based on the response of the fetch request
function serverConnected(response) {
    const toReturn = {connected:false, error:""}
    if (response.ok) {
        toReturn.connected = true;
    }
    else {
        if (response.status === "NO_RESPONSE_CODE") {
            // No server
            toReturn.error = "Server Unavailable"
        }
    }
    return toReturn;
}

// Based on the response data (rspn) from the server, returns true if the data change was a success and false if not
// This function can be chaged if the response of the server changes format, so we dont need to change every fetch call
function dataChangeSuccess(rspn, op="") {
    if(!Boolean(rspn['success'])) {
        console.log(op + " operation was not sucessfull.")
        console.log(rspn)
        return false;
    }
    return true;
}

// This is responsible for keeping the note data formating
// All the business logic should go here, so the rest of the app only cares about the data itself and not it's rules
function useNoteList() {

    const [ls, setLs] = useState([]);
    // Should connection be part of this? It seems good to show errors, but not that good in division of responsability
    // Actually should the connection be done inside the useNoteList hook? I mean, this should be responsible of keeping the state of
    // the noteList, not relations with the server. Perhaps the server conector should be a parameter for this function
    // NOTE: The connection should be set before and after the async operation, since it should not be considered false when it's trying to do a connection
    const [connection, setConnection] = useState({successful: false, lastOperation: getNotes});

    // Load data
    useEffect(() => {getNotes()}, [])

    // Execute any treatment operations on the list before setting the state
    function setNoteList(noteList) {
        setLs(removeGapFromList(noteList))
    }

    function getNotes() {
        // Is this function doing too much? Lets see...
        // It declares two variables used for the fetch function, and only this. This doesnt add bloat
        // Then the connect success var is added, to return to the app so it can show an error or not depending on it's value
        // The error checking can be considered bloat? I think so, because it's a lot of logic inside of a single function

        const data_path = "/api/notes"
        const url = source_url + data_path
        let connectSuccess = false;

        fetch(url)
        // For example, this whole part logic can change in the future. What all of this do?
        // Checks if the connection with the server happened and some data returned
        // Now everything looks way nicer. If there is ever a problem with server connection, i don't need to change it here
        // And the same goes to every other function that implemented the same logic. now i change once, apply everywere
        .then(response => {
            const serverConnectionStatus = serverConnected(response)
            if (serverConnectionStatus.connected) {
                return response.json()
            }
            else {
                return Promise.reject(new Error(serverConnectionStatus.error))
            }
        })
        .then(data => {
            // Checks if every received data is a note
            // This is doing four things: checks every note in the data, returns an error if a note is not valid, then formats the data and set Ls as the data.
            // Now it only does three, since the formating is done inside the function
            // NOTE: Since im in a refactor and not in a feature, i will not change this logic, but the setNoteList function could check for bad formated notes too since is something usefull to every function that manipulates note data
            for (const d of data) {
                const [isnote, err] = isNote(d);
                if (!isnote) return Promise.reject(new Error(err));
            }
            connectSuccess = true;
            setNoteList(data);
        })
        .catch(error => {
                console.log(error.toString())
                console.log("Was not able to connect to server")
        })
        .finally(() => {
            setConnection({successful:connectSuccess, lastOperation:getNotes});
        })
    }

    function addNote(text) {
        // What does this function do?
        // To add a note this function needs three things: the note id, the note text and the note order
        // The text comes to the function as an argument, while the other two thing needs to come from inside the state
        // The last note id already comes from a function, and there is no secret for last order. It's just the lenght if the list is nicely formated.
        // But since the note data dont change in the rest of the function, i could create the note right here
        const newNote = createNote(getLastNoteId(ls)+1, text, ls.length)

        // This here is the same as other functions. Perhaps this i can refactor since every other function does the same
        const data_path = "/api/add"
        const url = source_url + data_path
        let connectSuccess = false;

        // So here is something that needs refactor. As you can see, in every operation except get, i use a header to my fetch
        // The header is basically the same for each fetch, and the problem is exactly that since i write each one individually,
        // I can end up with different headers for each one
        // The header is a JSON-formated object, so let's take it out for a function that returns just that
        fetch(url,getPostRequestObj(JSON.stringify(newNote)))
        .then(response => {
            const serverConnectionStatus = serverConnected(response)
            if (serverConnectionStatus.connected) {
                return response.json()
            }
            else {
                return Promise.reject(new Error(serverConnectionStatus.error))
            }
        })
        .then(json => {connectSuccess = dataChangeSuccess(json, "Add")})
        .catch(err => console.log(err))
        .finally(() => {
            setConnection({successful:connectSuccess, lastOperation: () => addNote(text)});
        })

        // This is outside the fetch function so the UI updates before the operation ends
        // NOTE: Perhaps a way of solving problems with different data on the front x back would be to
        // make a second check on the finnaly function
        setNoteList([...ls, newNote]);
    }

    function deleteNote(id) {
        // This one is a simple one, just send the id to the server and it does the rest
        // Im assuming the server it's at least a CRUD, so it have it's own logic to delete data
        // Otherwise i would need to send the whole JSON to the server everytime there is a deletion

        const remove_path = "/api/delete"
        const url = source_url + remove_path
        let connectSuccess = false;

        fetch(url, getPostRequestObj(JSON.stringify({"id":id})))
        .then(response => {
            const serverConnectionStatus = serverConnected(response)
            if (serverConnectionStatus.connected) {
                return response.json()
            }
            else {
                return Promise.reject(new Error(serverConnectionStatus.error))
            }
        })
        .then(json => {connectSuccess = dataChangeSuccess(json, "Delete")})
        .catch(err => console.log(err))
        .finally(() => {setConnection({successful:connectSuccess, lastOperation:() => deleteNote(id)});})

        // This one doesnt need that much refactor since this filter function does most of the job
        // And the other repetitive parts where refactor with the other functions
        setNoteList(ls.filter((n) => n.id !== id));
    }

    function editNote(noteData) {
        // Since the part of the app who calls this function also has the data of the whole note,
        // it is simpler to pass the whole data
        // What does this function do though?
        // First it creates a new note with the data that was changed from the original. It doesnt know what was changed tho
        // Then it does a request to the edit/update route of the server with the editedNote as the body
        // And last but not least, creates a new list replacing the old note with the new one, and sets ls as the new list
        const editedNote = createNote(noteData.id, noteData.text, noteData.order)

        const edit_path = "/api/edit"
        const url = source_url + edit_path
        let connectSuccess = false;

        fetch(url,getPostRequestObj(JSON.stringify(editedNote)))
        .then(response => {
            const serverConnectionStatus = serverConnected(response)
            if (serverConnectionStatus.connected) {
                return response.json()
            }
            else {
                return Promise.reject(new Error(serverConnectionStatus.error))
            }
        })
        // So this logic repeats three times, with the only change being the error message. Let's take this out to it's own function
        // Now that it's in its own function, all the other fetch calls are easier to read
        .then(json => {connectSuccess = dataChangeSuccess(json, "Edit")})
        .catch(error =>
        {
            console.log(error.toString())
            console.log("Was not able to connect to server")
        })
        .finally(() => {
            setConnection({successful:connectSuccess, lastOperation:() => editNote(noteData)});
        })

        // Browser part
        const newList = ls.map((n) => {
            if (n.id === noteData.id) return editedNote
            return n;
        });

        setNoteList(newList);
    }

    function switchNoteOrder(noteOrdA, noteOrdB) {
        // So in this one it's a little bit different, since the business logic is done here and at the server
        // NOTE: Need to change this later
        // We not only need to change the note order here, but we need to send notes in a specific format to the server
        // This operation here does the transition of notes, and since it only happens once, i dont think it needs to have it's own function
        // We do change the note order based on the order itself instead of the ID, but since we need to find the id for the
        // server, we end up needing for two large operations here.
        // TODO: Find a better way of doing this
        const n1 = ls.find((n) => n.order === noteOrdA)
        const n2 = ls.find((n) => n.order === noteOrdB)
        const updatedNotes = [{...n2,order:n1.order},{...n1,order:n2.order}]

        // Backend part
        const edit_path = "/api/order"
        const url = source_url + edit_path
        let connectSuccess = false;

        fetch(url, getPostRequestObj(JSON.stringify({notes:updatedNotes})))
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
        .then()
        .catch(error => {
            console.log(error.toString())
            console.log("Was not able to connect to server")
        })
        .finally(() => {
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

        setNoteList(newData);
    }

    // Perhaps this is too much data to return from a single hook. I should analyze it
    return [ls,  addNote, deleteNote, editNote, connection, switchNoteOrder]
}

export default useNoteList;