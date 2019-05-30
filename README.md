# nWeather

![dependencies](https://img.shields.io/david/josefaidt/nWeather.svg?style=flat-square)
![dev dependencies](https://img.shields.io/david/dev/josefaidt/nWeather.svg?style=flat-square)
![License](https://img.shields.io/github/license/josefaidt/nWeather.svg?style=flat-square)

> ***N**ot another **Weather** API*

nWeather is a GraphQL wrapper for the OpenWeatherMap REST endpoint. Visit the [ZEIT deployment](https://nweather.josefaidt.now.sh/api)

## Examples

### Current Weather

#### Browse by City Name

```graphql
query {
  currentWeather(city: "Baton Rouge") {
    name
    weather {
      main
      description
    }
    main {
      temp
    }
  }
}
```

#### Browse by ZIP

```graphql
query {
  currentWeather(zip: 70802) {
    name
    weather {
      main
      description
    }
    main {
      temp
    }
  }
}
```

#### Browse by Coordinates

```graphql
query {
  currentWeather(coords: { lat: 30.44, lon: -91.17 }) {
    name
    weather {
      main
      description
    }
    main {
      temp
    }
  }
}
```

### Forecast

Forecast list is in 3-hour intervals (i.e. `limit: 3` returns 3 sets of data across a 9 hour span)

#### Browse by ZIP

```graphql
query {
  forecast(zip: 70802, limit: 3) {
    cnt
    list {
      main {
        temp
        humidity
        pressure
        sea_level
        temp_min
        temp_max
      }
      weather {
        main
        description
        id
        icon
      }
      dt
      dt_txt
      wind {
        speed
        deg
      }
    }
  }
}
```
