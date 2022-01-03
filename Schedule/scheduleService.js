import MovieSession from '../MovieSessions/movieSessionModel.js';

class Service {
  async getAll(city, cinema, date) {
    const allCinemas = 'All cinemas';

    let movieSessions = await MovieSession.aggregate([
      {
        $lookup: {
          from: "cinemas",
          localField: "hall_id",
          foreignField: "hall_id",
          as: "hall"
        }
      },
      {
        $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$hall", 0] }, "$$ROOT"] } }
      },
      { $project: { hall: 0 } },
      {
        $lookup: {
          from: "movies",
          localField: "movie_id",
          foreignField: "_id",
          as: "movie"
        }
      },
      {
        $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$movie", 0] }, "$$ROOT"] } }
      },
      { $project: { movie: 0 } },
      {
        $lookup: {
          from: "cities",
          localField: "city_id",
          foreignField: "_id",
          as: "city"
        }
      },
      {
        $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$city", 0] }, "$$ROOT"] } }
      },
      { $project: { city: 0 } }
    ])
    let filteredByDateSessions = movieSessions.filter(elem => {
      let date1=new Date(elem.date).toLocaleDateString();
      let date2=date;
      return date1===date2
    });
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

      return schedule;
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

    let schedule = filteredByDateSessions.map(mapToScheduleObject).reduce(mergeSchedules, []);
    let filteredByCitySchedule = schedule.filter(elem => elem.cityName === city);

    if (cinema !== allCinemas) {
      let filteredByCinemaSchedule = schedule.filter(elem => elem.cinemaName === cinema);
      return filteredByCinemaSchedule
    }
    return filteredByCitySchedule;

  }
}
export default new Service();
