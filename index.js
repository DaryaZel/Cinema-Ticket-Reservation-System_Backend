import 'dotenv/config';
import express from 'express';
import moviesRoutes from './Movies/moviesRouter.js';
import citiesRoutes from './Cities/citiesRouter.js';
import cinemaRoutes from './Cinemas/cinemaRouter.js';
import cinemaHallRoutes from './CinemaHalls/cinemaHallRouter.js';
import seatsRoutes from './Seats/seatsRouter.js';
import availableSeatsRoutes from './AvailableSeats/availableSeatRouter.js';
import seatTypesRoutes from './SeatTypes/seatTypesRouter.js';
import scheduleRoutes from './Schedule/scheduleRouter.js';
import imageRoutes from './ImagesStorage/imagesRouter.js';
import movieSessionRoutes from './MovieSessions/movieSessionRouter.js';
import authorizationRoutes from './Authorization/authorizationRouter.js';
import mongoose from 'mongoose';


const PORT = process.env.PORT || 5000;
const app = express();
app.get("/", (req, res) => {
  res.send('Hello World!')
})
app.use(express.json());
app.use('/auth', authorizationRoutes);
app.use('/movie', moviesRoutes);
app.use('/cinema', cinemaRoutes);
app.use('/session', movieSessionRoutes);
app.use('/city', citiesRoutes);
app.use('/hall', cinemaHallRoutes);
app.use('/schedule', scheduleRoutes);
app.use('/image', imageRoutes);
app.use('/seat', seatsRoutes);
app.use('/availableseat', availableSeatsRoutes);
app.use('/seatTypes', seatTypesRoutes);

async function startApp() {
  try {
    await mongoose.connect(process.env.DB_URL,
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

