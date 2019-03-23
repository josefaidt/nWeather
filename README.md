# nWeather

![dependencies](https://img.shields.io/david/josefaidt/nWeather.svg?style=flat-square)
![dev dependencies](https://img.shields.io/david/dev/josefaidt/nWeather.svg?style=flat-square)
![License](https://img.shields.io/github/license/josefaidt/nWeather.svg?style=flat-square)

> **N**ot another **Weather** API

nWeather is a GraphQL wrapper for the OpenWeatherMap REST endpoint.

## Getting Started

1. Download this repo
2. Unzip and open the directory in your favorite code editor
3. In `env.sample.js`, input your OpenWeatherMap API Key
4. `mv env.sample.js env.js`
5. Install dependencies: `yarn install`
6. Run the server: `yarn start`
7. Navigate out to `http://localhost:8000/playground`

## Examples

### Browse by City Name

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

### Browse by ZIP

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

### Browse by Coordinates

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
