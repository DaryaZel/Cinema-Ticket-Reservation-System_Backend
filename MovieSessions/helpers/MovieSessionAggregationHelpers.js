export function sessionsCalenderSample(timeZone) {
  let sessionsCalenderSample = [
    {
        $group: {
            _id: null,
            days: { $addToSet: { $dateToString: { date: "$date", format: "%m/%d/%Y", timezone: timeZone } } }
        }
    }
]
  return sessionsCalenderSample;
}
