export function cinemaSample() {
  let cinemaSample = [
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
  ]
  return cinemaSample;
}
