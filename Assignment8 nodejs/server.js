const express = require('express');
const path = require('path');


const app = express();
const Port = 3000;

app.use(express.static(path.join(__dirname, './')));

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, './index.html'));
});

app.listen(Port, () => {
    console.log('Server is running on port: ' + Port);
});