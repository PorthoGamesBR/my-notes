const express = require("express");

const app = express();

app.get('/', (request, response) => {
    response.send("Hello World")
});

app.get('/app', (request, response) => {

})

app.get('/api/notes', (request, response) => {

})

app.post('/api/add', (request, response) = {

})

app.post('/api/delete', (request, response) = {

})

app.post('/api/edit', (request, response) = {

})

app.post('/api/order', (request, response) = {

})


app.listen(3000, () => {console.log("App available on http://localhost:3000")})