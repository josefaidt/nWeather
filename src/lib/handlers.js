const fetch = require('node-fetch')
const constructQueryUrl = require('./openweathermap')
const addFields = require('./addFields')

const handleCurrentWeather = async locationArgs => {
  const { zip, city, coords } = locationArgs
  if ((zip && city) || (zip && coords) || (city && coords) || (zip && city && coords)) {
    throw new Error('Specify only one location argument')
  } else if (zip) {
    if (zip.toString().length > 5 || zip.toString().length < 5) {
      throw new Error('ZIP must be 5 digits long')
    } else {
      const url = constructQueryUrl('weather', { zip })
      await fetch(url)
        .then(res => res.json())
        .then(addFields)
        .catch(console.error)
    }
  } else if (city) {
    const url = constructQueryUrl('weather', { city })
    return fetch(url)
      .then(res => res.json())
      .catch(console.error)
  } else if (coords.lat && coords.lon) {
    const url = constructQueryUrl('weather', { coords })
    return fetch(url)
      .then(res => res.json())
      .catch(console.error)
  } else if (coords && (!coords.lat || !coords.lon)) {
    // TODO: properly handle coords filter, but no coord props
    throw new Error('Specify coordinates')
  } else {
    throw new Error('Specify at least one argument')
  }
}

module.exports = {
  handleCurrentWeather,
}
