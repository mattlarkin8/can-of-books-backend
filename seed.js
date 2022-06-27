'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL);
const Book = require('./models/book');

async function seed() {
  await Book.create({
    title: 'Cat in the Hat',
    description: 'Children\'s book about a cat wearing a hat.',
    status: true
  });

  await Book.create({
    title: 'Green eggs and ham',
    description: 'Children\'s book about Sam not liking green eggs and ham.',
    status: true
  });

  await Book.create({
    title: 'The Lorax',
    description: 'LEAVE THE TREES ALONE!',
    status: true
  });
  mongoose.disconnect();
}

seed();
