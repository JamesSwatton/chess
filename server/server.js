const express = require('express');
const app = express();
const path = require('path');
const parser = require('body-parser');
 
app.use(express.static(path.join(__dirname, '../public')))
app.use(parser.json());

const testBoard= [1, 2, 2];

app.get('/test', (req, res, next) => {
    res.status(200).send(testBoard);
})

app.post('/test', (req, res, next) => {
    testBoard.push(req.body);
    res.status(201).send(testBoard);
})

app.listen(3000, () => {
    console.log('listening on port: 3000');
})
