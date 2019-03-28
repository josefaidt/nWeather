const fetch = require('node-fetch')
const constructQueryUrl = require('../lib/openweathermap')
const addFields = require('../lib/addFields')

const forecast = (_, { zip, city, coords, limit }) => {
  const count = limit || 8 // count=8 is one day of data
  if ((zip && city) || (zip && coords) || (city && coords) || (zip && city && coords)) {
    throw new Error('Specify only one location argument')
  } else if (zip) {
    if (zip.toString().length > 5 || zip.toString().length < 5) {
      throw new Error('ZIP must be 5 digits long')
    } else {
      const url = constructQueryUrl('forecast', { zip, limit: count })
      console.log(url)
      return fetch(url)
        .then(res => res.json())
        .catch(console.error)
    }
  } else if (city) {
    const url = constructQueryUrl('forecast', { city, limit: count })
    return fetch(url)
      .then(res => res.json())
      .catch(console.error)
  } else if (coords.lat && coords.lon) {
    const url = constructQueryUrl('forecast', { coords, limit: count })
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

module.exports = forecast
