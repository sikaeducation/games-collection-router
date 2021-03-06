const express = require("express")
const app = express()
const queries = require("./queries")

app.use(express.json())

app.get("/games", (request, response) => {
    queries.list().then(games => {
        response.json({games});
    }).catch(console.error);
});

app.get("/games/:id", (request, response) => {
    queries.read(request.params.id).then(game => {
        game
            ? response.json({game})
            : response.sendStatus(404)
    }).catch(console.error);
});

app.post("/games", (request, response) => {
    queries.create(request.body).then(game => {
        response.status(201).json({game});
    }).catch(console.error);
});

app.delete("/games/:id", (request, response) => {
    queries.delete(request.params.id).then(() => {
        response.sendStatus(204);
    }).catch(console.error);
});

app.put("/games/:id", (request, response) => {
    queries.update(request.params.id, request.body).then(game => {
        response.json({game});
    }).catch(console.error);
});

app.use((error, request, response, next) => {
    response.status(500)
    response.json({
      error: error.message,
    })
});

module.exports = app
