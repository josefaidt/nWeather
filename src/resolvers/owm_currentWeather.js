const { UserInputError } = require('apollo-server')
const fetch = require('node-fetch')
const constructQueryUrl = require('../endpoints/openweathermap')
const addFields = require('../lib/addFields')

const currentWeather = (parent, args) => {
  if (Object.entries(args).length > 0 && args.constructor === Object) {
    const { zip, city, coords } = args
    if ((zip && city) || (zip && coords) || (city && coords) || (zip && city && coords)) {
      return new Error('Specify only one location argument')
    } else if (zip) {
      if (zip.toString().length > 5 || zip.toString().length < 5) {
        return new Error('ZIP must be 5 digits long')
      } else {
        const url = constructQueryUrl('weather', { zip })
        return fetch(url)
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
      return new Error('Specify coordinates')
    } else {
      return new Error('Specify at least one argument')
    }
  } else {
    return new Error('Provide at least one location parameter')
  }
}

module.exports = currentWeather
