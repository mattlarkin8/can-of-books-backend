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

const PORT = process.env.PORT || 3002;

app.get('/',(req,res)=>{
  res.status(200).send('Welcome!');
})

app.get('/books', getBooks)

async function getBooks(req,res,next){
  try{
    let results=await Book.find();
    res.status(200).send(results);
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

app.listen(PORT, () => console.log(`listening on ${PORT}`));
