const { gql } = require('apollo-server')
module.exports = gql`
  type CurrentWeather {
    _id: ID!
    id: Int!
    coord: Coordinates!
    name: String!
    sys: SystemInfo!
    weather: [WeatherStatus!]!
    main: MainWeatherInfo!
    wind: WindInfo!
    dt: Int!
  }

  type Forecast {
    _id: ID!
    cnt: Int!
    list: [ForecastListItem!]!
  }

  type ForecastListItem {
    dt: Int!
    dt_txt: String!
    main: MainWeatherInfo!
    weather: [WeatherStatus!]!
    wind: WindInfo!
  }

  type Coordinates {
    lon: Float!
    lat: Float!
  }

  type SystemInfo {
    _id: ID!
    id: Int!
    message: Float!
    country: String!
    sunrise: Int!
    sunset: Int!
    # Extras
    sunriseTime: String!
    sunsetTime: String!
  }

  type MainWeatherInfo {
    temp: Float!
    humidity: Int!
    pressure: Float!
    sea_level: Float!
    temp_min: Float!
    temp_max: Float!
  }

  type WindInfo {
    speed: Float!
    deg: Float
  }

  type WeatherStatus {
    id: Int!
    main: String!
    description: String!
    icon: String!
    # Extras
    iconLink: String!
  }

  scalar Coords

  type Query {
    currentWeather(zip: Int, city: String, coords: Coords): CurrentWeather!
    forecast(zip: Int, city: String, coords: Coords, limit: Int): Forecast!
  }

  enum LocationQuery {
    zip
    city
    coords
  }
`
