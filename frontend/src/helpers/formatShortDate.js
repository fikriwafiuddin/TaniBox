const formatShortDate = (dateString) => {
  const date = new Date(dateString)

  if (isNaN(date.getTime())) {
    return "Invalid Date"
  }

  const day = date.getDate()

  const monthAbbreviations = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ]
  const month = monthAbbreviations[date.getMonth()]

  return `${day} ${month}`
}

export default formatShortDate
