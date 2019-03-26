const { convertUnixDate } = require('./date')

const addFields = data => {
  const result = { ...data }
  if (result.weather[0]) {
    result.weather[0].iconLink = `http://openweathermap.org/img/w/${result.weather[0].icon}.png`
  }
  result.sys.sunriseTime = convertUnixDate(result.sys.sunrise).toLocaleTimeString()
  result.sys.sunsetTime = convertUnixDate(result.sys.sunset).toLocaleTimeString()
  return result
}

module.exports = addFields
