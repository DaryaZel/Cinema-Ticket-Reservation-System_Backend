import 'dotenv/config';
import express from 'express';
import http from 'http';
import cors from 'cors';
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
import reservationRoutes from './Reservation/reservationRouter.js';
import authorizationRoutes from './Authorization/authorizationRouter.js';
import mongoose from 'mongoose';
import AvailableSeat from './AvailableSeats/availableSeatModel.js';
const clients = new Set();

const PORT = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);
app.get("/", (req, res) => {
  res.send('Hello World!')
})

app.use(cors());
app.use(express.json());
app.use('/auth', authorizationRoutes);
app.use('/movie', moviesRoutes);
app.use('/cinema', cinemaRoutes);
app.use('/session', movieSessionRoutes);
app.use('/reservation', reservationRoutes);
app.use('/city', citiesRoutes);
app.use('/hall', cinemaHallRoutes);
app.use('/schedule', scheduleRoutes);
app.use('/image', imageRoutes);
app.use('/seat', seatsRoutes);
app.use('/availableseat', availableSeatsRoutes);
app.use('/seatTypes', seatTypesRoutes);

const webSocketServer = new WebSocketServer({ server });

webSocketServer.on('connection', (ws, req) => {
  clients.add(ws);
  let url = req.url.slice(2).toString();
  const params = new URLSearchParams(url);
  const sessionIdParam = params.get('movieSessionId');

  async function getSeats() {
    const availableSeat = await AvailableSeatService.getAllAvailableSeats(sessionIdParam);
    return availableSeat
  }

  async function makeSeatSelectedTrue(seat) {
    await AvailableSeatService.makeSelectTrue(seat);
  };

  async function makeSeatSelectedFalse(seat) {
    await AvailableSeatService.makeSelectFalse(seat);
  };

  async function reserveSeat(seat) {
    await AvailableSeatService.reserveSeat(seat);
  };
  async function makeAllSelectedSeatsFalse(seat) {
    await AvailableSeatService.makeAllSelectedSeatsFalse(seat);
  };

  ws.on('message', function message(data) {
    const jsonMessage = JSON.parse(data);
    if (jsonMessage.event === 'makeSeatSelectedTrue') {
      makeSeatSelectedTrue(jsonMessage.seat).then(() => {
        getSeats().then((seats) => {
          for (let client of clients) {
            client.send(JSON.stringify(seats));
          }
        })
      });
    }
    else if (jsonMessage.event === 'makeSeatSelectedFalse') {
      makeSeatSelectedFalse(jsonMessage.seat).then(() => {
        getSeats().then((seats) => {
          for (let client of clients) {
            client.send(JSON.stringify(seats));
          }
        })
      });
    }
    else if (jsonMessage.event === 'reserveSeat') {
      reserveSeat(jsonMessage.seat).then(() => {
        getSeats().then((seats) => {
          for (let client of clients) {
            client.send(JSON.stringify(seats));
          }
        })
      });
    }
    else if (jsonMessage.event === 'makeAllSelectedSeatsFalse') {
      makeAllSelectedSeatsFalse(jsonMessage.seat).then(() => {
        getSeats().then((seats) => {
          seats.push('makeAllSelectedSeatsFalse');
          for (let client of clients) {
            client.send(JSON.stringify(seats));
          }
        })
      });
    }

  });

  ws.on("error", e => {
    console.log(e)
    ws.send(e)
  }
  );
  getSeats().then((seats) => {
    ws.send(
      JSON.stringify(seats)
    );
  })

  ws.on('close', function () {
    clients.delete(ws);
  })

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


