const key =
  process.env.NODE_ENV === 'PRODUCTION'
    ? process.env.OWM_API_KEY
    : require('../../config/env').openweathermap.key

const urlStructure = {
  base: `https://api.openweathermap.org/data/2.5/`,
  zip: `?zip=`,
  city: `?q=`,
  count: `&cnt=`,
  apiKey: `&APPID=${key}`,
  caboose: `&units=imperial&APPID=${key}`,
}

const constructQueryUrl = (type, { zip, city, coords, limit }) => {
  const { base, caboose, city: qCity, zip: qZip, count } = urlStructure

  if (zip) {
    return `${base}${type}${qZip}${zip}${
      type === 'forecast' && limit ? `${count}${limit}` : ``
    }${caboose}`
  } else if (city) {
    return `${base}${type}${qCity}${city}${caboose}`
  } else if (coords) {
    return `${base}${type}?lat=${coords.lat}&lon=${coords.lon}${caboose}`
  }
}

module.exports = constructQueryUrl
