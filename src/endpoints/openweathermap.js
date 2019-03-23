const {
  openweathermap: { key },
} = require('../../env')

const urlStructure = {
  base: `https://api.openweathermap.org/data/2.5/`,
  zip: `?zip=`,
  city: `?q=`,
  type: `weather`,
  apiKey: `&APPID=${key}`,
  caboose: `&units=imperial&APPID=${key}`,
}

const constructQueryUrl = (type, { zip, city, coords }) => {
  const { base, caboose, city: qCity, zip: qZip } = urlStructure

  if (zip) {
    return `${base}${type}${qZip}${zip}${caboose}`
  } else if (city) {
    return `${base}${type}${qCity}${city}${caboose}`
  } else if (coords) {
    return `${base}${type}?lat=${coords.lat}&lon=${coords.lon}${caboose}`
  }
}

module.exports = constructQueryUrl
