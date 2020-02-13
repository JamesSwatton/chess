const express = require('express');
const app = express();
const path = require('path');
const parser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

let chessCollection;

MongoClient.connect('mongodb://localhost:27017')
    .then(client => {
        console.log('connected to db')
        const db = client.db('chess');
        chessCollection = db.collection('board');
    }).catch(console.error);



const boardRouter = express.Router();
app.use('/board', boardRouter);
app.use(express.static(path.join(__dirname, '../public')))
boardRouter.use(parser.json());

// const testBoard= [1, 2, 2];

boardRouter.get('/', (req, res, next) => {
    chessCollection
        .find()
        .toArray()
        .then((docs) => res.status(200).send(docs));
})

boardRouter.post('/', (req, res, next) => {
    console.log(req.body);
    const body = {
        newBoard: req.body
    };
    chessCollection.insertOne(body)
        .then(() => chessCollection.find().toArray())
        .then((docs) => res.status(201).send(docs));
    ;
})

app.listen(3000, () => {
    console.log('listening on port: 3000');
})
