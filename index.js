import express from 'express';
import moviesRoutes from './Movies/moviesRouter.js'
import mongoose from 'mongoose';


const DB_URL = 'mongodb+srv://DaryaZel:fGEj5CtwRTWRNzX@cluster0.uunez.mongodb.net/myFirstDatabse?retryWrites=true&w=majority';
const PORT = 5000;
const app = express();
app.use(express.json());
app.use('/movie', moviesRoutes);

async function startApp() {
  try {
    await mongoose.connect(DB_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    )
    app.listen(PORT);
  }
  catch (error) {
    console.log(error)
  }
}

startApp()

