const owmCurrentWeather = require('./owm_currentWeather')
const owmForecast = require('./owm_forecast')

module.exports = {
  owm: {
    currentWeather: owmCurrentWeather,
    forecast: owmForecast,
  },
}
