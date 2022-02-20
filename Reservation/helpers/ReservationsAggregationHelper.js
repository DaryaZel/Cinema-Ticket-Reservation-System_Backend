export function reservationSample(userId) {
  let reservationSample = [
    { $match: { user_id: userId } },
    {
      $sort: {
        createdAt: 1
      }
    },
    {
      $lookup: {
        from: "tickets",
        localField: "ticketsList",
        foreignField: "_id",
        as: "tickets"
      }
    },
    {
      $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$tickets", 0] }, "$$ROOT"] } }
    },
    { $project: { "ticketsList": 0, "availableSeat_row": 0, "availableSeat_id": 0, "availableSeat_number": 0, "availableSeat_price": 0 } },
    {
      $lookup: {
        from: "moviesessions",
        localField: "session_id",
        foreignField: "_id",
        as: "moviesession"
      }
    },
    {
      $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$moviesession", 0] }, "$$ROOT"] } }
    },
    { $project: { moviesession: 0 } },
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
    { $project: { movie: 0, storyline:0 } },
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
  ];
  return reservationSample;
}
