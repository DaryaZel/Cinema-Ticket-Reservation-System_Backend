import 'dotenv/config';
import express from 'express';
import http from 'http';
import WebSocket, { WebSocketServer } from 'ws';
import moviesRoutes from './Movies/moviesRouter.js';
import citiesRoutes from './Cities/citiesRouter.js';
import cinemaRoutes from './Cinemas/cinemaRouter.js';
import cinemaHallRoutes from './CinemaHalls/cinemaHallRouter.js';
import seatsRoutes from './Seats/seatsRouter.js';
import availableSeatsRoutes from './AvailableSeats/availableSeatRouter.js';
import AvailableSeatService from './AvailableSeats/availableSeatService.js';
import seatTypesRoutes from './SeatTypes/seatTypesRouter.js';
import scheduleRoutes from './Schedule/scheduleRouter.js';
import imageRoutes from './ImagesStorage/imagesRouter.js';
import movieSessionRoutes from './MovieSessions/movieSessionRouter.js';
import authorizationRoutes from './Authorization/authorizationRouter.js';
import mongoose from 'mongoose';


const PORT = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);
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

const webSocketServer = new WebSocketServer({ server });

webSocketServer.on('connection', (ws, req) => {
  let url = req.url.slice(2).toString();
  const params = new URLSearchParams(url);
  const sessionIdParam = params.get('movieSessionId');
  async function getSeats() {
    const availableSeat = await AvailableSeatService.getAllAvailableSeats(sessionIdParam);
    return availableSeat
  }
  // ws.on('message', function message(data) {
  //   console.log(`Received message ${data} from user ${client}`);
  // });

  ws.on("error", e => ws.send(e));

  setInterval(() => {
    getSeats().then((seats) => {
      console.log( JSON.stringify(seats))
      ws.send(
        JSON.stringify(seats)
      );
    })
  }, 2000)

});


async function startApp() {
  try {
    await mongoose.connect(process.env.DB_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    )
    server.listen(PORT);
  }
  catch (error) {
    console.log(error)
  }
}

startApp()


