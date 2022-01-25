import Movie from '../Movies/moviesModel.js';
import MovieSession from '../MovieSessions/movieSessionModel.js';
import { movieSessionSample } from './helpers/helpers.js';

const allCinemas = 'All cinemas';
const wholeCalender = 'Whole calender';

class Service {
  async getAll(city, cinema, date, timezone) {
    let movieSessions = await MovieSession.aggregate(movieSessionSample());

    function mapToScheduleObject(movieSessionData) {
      let session = {
        "id": movieSessionData._id,
        "hall_id": movieSessionData.hall_id,
        "date": movieSessionData.date
      };
      let movie = {
        "id": movieSessionData.movie_id,
        "movieName": movieSessionData.movieName,
        "storyline": movieSessionData.storyline,
        "sessions": [session]
      };
      let schedule = {
        "cinemaName": movieSessionData.cinemaName,
        "cinemaAddress": movieSessionData.cinemaAddress,
        "cityName": movieSessionData.cityName,
        "movies": [movie]
      };
      let dateSchedule = {
        "day": new Date(movieSessionData.date).toLocaleDateString({ timeZone: timezone }),
        "schedules": [schedule]
      };

      return dateSchedule;
    }

    function mergeDateSchedules(mergedDateSchedules, dateSchedule) {
      let existingDateSchedule = mergedDateSchedules.find(item => item.day === dateSchedule.day);
      if (existingDateSchedule) {
        dateSchedule.schedules.reduce((mergedSchedules, schedule) => mergeSchedules(mergedSchedules, schedule), existingDateSchedule.schedules);
      } else {
        mergedDateSchedules.push(dateSchedule);
      }

      return mergedDateSchedules;
    }

    function mergeSchedules(mergedSchedules, schedule) {
      let existingSchedule = mergedSchedules.find(item => item.cinemaName === schedule.cinemaName);
      if (existingSchedule) {
        schedule.movies.reduce((mergedMovies, movie) => mergeMovies(mergedMovies, movie), existingSchedule.movies);
      } else {
        mergedSchedules.push(schedule);
      }
      return mergedSchedules;
    }

    function mergeMovies(mergedMovies, movie) {
      let existingMovie = mergedMovies.find(item => item.movieName === movie.movieName);
      if (existingMovie) {
        movie.sessions.forEach(session => {
          if (!existingMovie.sessions.includes(session)) {
            existingMovie.sessions.push(session);
          }
        })
      } else {
        mergedMovies.push(movie);
      }

      return mergedMovies;
    }

    let schedule = movieSessions.map(mapToScheduleObject).reduce(mergeDateSchedules, []);

    let filteredSchedule = schedule.map((elem) => {
      let dateSchedule = {
        "day": elem.day,
        "schedules": elem.schedules.filter(elem => elem.cityName === city)
      }
      return dateSchedule
    })

    if (date !== wholeCalender) {
      filteredSchedule = filteredSchedule.filter(elem => elem.day === new Date(date).toLocaleDateString({ timeZone: timezone }))
    }

    if (cinema !== allCinemas) {
      filteredSchedule = filteredSchedule.map((elem) => {
        let dateSchedule = {
          "day": elem.day,
          "schedules": elem.schedules.filter(elem => elem.cinemaName === cinema)
        }
        return dateSchedule
      })
    }
    return filteredSchedule;
  }

  async getOne(id, city, cinema, date, timezone) {
    const foundMovie = await Movie.findById(id);
    let movieSessions = await MovieSession.aggregate(movieSessionSample());
    let filteredByMovieSessions = movieSessions.filter(elem => elem.movieName === foundMovie.movieName);

    function mapToScheduleObject(movieSessionData) {
      let session = {
        "id": movieSessionData._id,
        "hall_id": movieSessionData.hall_id,
        "date": movieSessionData.date.toLocaleString({ timeZone: timezone })
      };
      let schedule = {
        "cinemaName": movieSessionData.cinemaName,
        "cinemaAddress": movieSessionData.cinemaAddress,
        "cityName": movieSessionData.cityName,
        "sessions": [session]
      };
      let dateSchedule = {
        "day": movieSessionData.date.toLocaleDateString({ timeZone: timezone }),
        "schedules": [schedule]
      };
      return dateSchedule;
    }

    function mergeDateSchedules(mergedDateSchedules, dateSchedule) {
      let existingDateSchedule = mergedDateSchedules.find(item => item.day === new Date (dateSchedule.day).toLocaleDateString({ timeZone: timezone }));
      if (existingDateSchedule) {
        dateSchedule.schedules.reduce((mergedSchedules, schedule) => mergeSchedules(mergedSchedules, schedule), existingDateSchedule.schedules);
      } else {
        mergedDateSchedules.push(dateSchedule);
      }

      return mergedDateSchedules;
    }

    function mergeSchedules(mergedSchedules, schedule) {
      let existingSchedule = mergedSchedules.find(item => item.cinemaName === schedule.cinemaName);
      if (existingSchedule) {
        schedule.sessions.forEach(session => {
          if (!existingSchedule.sessions.includes(session)) {
            existingSchedule.sessions.push(session);
          }
        })
      } else {
        mergedSchedules.push(schedule);
      }
      return mergedSchedules;
    }
    let movieSchedule = filteredByMovieSessions.map(mapToScheduleObject).reduce(mergeDateSchedules, []);
    let filteredSchedule = movieSchedule.map((elem) => {
      let dateSchedule = {
        "day": elem.day,
        "schedules": elem.schedules.filter(elem => elem.cityName === city)
      }
      return dateSchedule
    })

    if (date !== wholeCalender) {
      filteredSchedule = filteredSchedule.filter(elem => elem.day === new Date (date).toLocaleDateString())
    }

    if (cinema !== allCinemas) {
      filteredSchedule = filteredSchedule.map((elem) => {
        let dateSchedule = {
          "day": elem.day,
          "schedules": elem.schedules.filter(elem => elem.cinemaName === cinema)
        }
        return dateSchedule
      })
    }
    return filteredSchedule;
  }
}

export default new Service();
