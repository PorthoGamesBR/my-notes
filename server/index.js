const express = require("express");
const { readFile, writeFile } = require('fs').promises
const writeFile2 = require('fs').writeFile
const bodyParser = require('body-parser');

const NOTE_FILE = "notes.json"

async function createNoteFile() {
    try{ await writeFile(NOTE_FILE, "[\n]", { flag: "wx"}) }
    catch {console.log("File Exists")}
}
createNoteFile()

const app = express();
app.use(express.static("build"))
app.use(bodyParser.json())
app.use(async (req,res,next) => {res.locals.notes = JSON.parse( await readFile(NOTE_FILE) ); next();})

app.get('/app', async (request, response) => {
    
    response.send(await readFile('build/index.html', 'utf-8'))

})

app.get('/api/notes', async (request, response) => {
    const data = response.locals.notes;
    response.json(data);
})

app.post('/api/add', async (request, response) => {
    const data = response.locals.notes;
    const newData = [...data, request.body]
    
    let toReturn = {success:false, error:""}
    writeFile2(NOTE_FILE, JSON.stringify(newData, null, 2), (err) => {
        if (err) {
            toReturn.error = err;
        }
        else {
            toReturn.success = true;
        }
        response.json(toReturn)
    })
    
})

app.post('/api/delete', async (request, response) => {
    const data = response.locals.notes;
    const idToRemove = request.body.id;
    const newData = data.filter((n) => n.id != idToRemove);
    await writeFile(NOTE_FILE, JSON.stringify(newData, null, 2))
    response.send((data.lenght - newData.lenght).toString())
})

app.post('/api/edit',async (request, response) => {
    const data = response.locals.notes;
    const newData = data.map((n) => {
        if (n.id === request.body.id) {
            return {...n, text: request.body.text}
        }
        return n;
    });

    await writeFile(NOTE_FILE, JSON.stringify(newData, null, 2))
})

app.post('/api/order',async (request, response) => {
    const data = response.locals.notes;
    const newData = data.map((n) => {
        const newNote = request.body.notes.find((rn) => rn.id == n.id)
        return newNote || n;
    })
    
    await writeFile(NOTE_FILE, JSON.stringify(newData, null, 2))
})


app.listen(5000, () => {console.log("App available on http://localhost:5000")})