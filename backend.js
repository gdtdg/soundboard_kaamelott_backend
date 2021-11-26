const express = require('express');
const path = require('path');
const fs = require("fs");

const app = express();

const soundList = {
    "a_kadoc": {
        "id": 1,
        "file_name": "a_kadoc",
        "path": "sounds/a_kadoc.mp3",
        "quote": "À Kadoc!",
        "author": "Kadoc",
        "season": "2",
        "episode_number": "60",
        "episode_name": "Le jeu du caillou"
    },
    "a_la_volette1": {
        "id": 2,
        "file_name": "a_la_volette1",
        "path": "sounds/a_la_volette1.mp3",
        "quote": "À la volette",
        "author": "Arthur",
        "season": "1",
        "episode_number": "26",
        "episode_name": "À la volette"
    },
    "2_3_poils_de_Q": {
        "id": 3,
        "file_name": "2_3_poils_de_Q",
        "path": "sounds/2_3_poils_de_Q.mp3",
        "quote": "À 2-3 poils de cul",
        "author": "Léodagan",
        "season": "1",
        "episode_number": "88",
        "episode_name": "L'escorte"
    }
}

app.get('/sound-list', (req, res) => {
    res.send(soundList);
})


app.get('/sound/:id', (req, res) => {
    // First read existing users.
    const filePath = path.join(__dirname, soundList[req.params.id].path);
    const stat = fs.statSync(filePath);

    res.writeHead(200, {
        'Content-Type': 'audio/mpeg',
        'Content-Length': stat.size,

    });

    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
})

const server = app.listen(8081, function () {
    const host = server.address().address
    const port = server.address().port
    console.log("Example app listening at https://%s:%s", host, port)
})
