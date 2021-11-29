const express = require('express');
const path = require('path');
const fs = require("fs");
const cors = require('cors');
const csp = require('helmet-csp')

// Definition of application options
const app = express();
cspOptions = {
    useDefaults: true,
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        connectSrc: ["'self'"]
    }
}
app.use(cors());
app.use(csp(cspOptions))

// Loading all the sounds data
const soundList = require('./sounds/sounds.json');

// Declaring routes
app.get('/sound-list', (req, res) => {
    res.header('Content-Type', 'application/json');
    res.send(soundList);
})

app.get('/sounds/:id', (req, res) => {
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

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
})

app.get('/favicon.ico', (req, res) => {
    res.sendFile(path.join(__dirname, '/favicon.ico'));
})

// Starting the app on port 8081
const server = app.listen(8081, function () {
    const host = server.address().address
    const port = server.address().port
    console.log("Example app listening at https://%s:%s", host, port)
})
