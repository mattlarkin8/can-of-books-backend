'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Book = require('./models/book');

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log('Mongoose is connected!');
});

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3002;

app.get('/',(req,res)=>{
  res.status(200).send('Welcome!');
})

app.get('/books', getBooks)
app.post('/books', postBooks);
app.delete('/books/:id', deleteBooks);
app.put('/books/:id', putBooks);

async function getBooks(req,res,next){
  try{
    let results=await Book.find();
    res.status(200).send(results);
  }catch(error){
    next(error);
  }
}

async function postBooks(req, res, next){
  try{
    let createdBook = await Book.create(req.body);
    res.status(200).send(createdBook);
  } catch(error){
    next(error);
  }
}

async function deleteBooks(req,res,next){
  let id=req.params.id;
  try{
    await Book.findByIdAndDelete(id);
    res.status(200).send('book deleted');
  }catch(error){
    next(error);
  }
}

async function putBooks(req,res,next){
  let id=req.params.id;
  try{
    let data = req.body;
    let updatedBook = await Book.findByIdAndUpdate(id, data, { new: true, overwrite: true });
    res.status(200).send(updatedBook);
  }catch(error){
    next(error);
  }
}

app.get('/test', (request, response) => {
  response.send('test request received');
})

app.get('*',(req,res)=>{
  res.status(404).send('Not available');
})

app.use((error, request, response, next) => {
  res.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
