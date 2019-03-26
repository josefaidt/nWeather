# nWeather

![dependencies](https://img.shields.io/david/josefaidt/nWeather.svg?style=flat-square)
![dev dependencies](https://img.shields.io/david/dev/josefaidt/nWeather.svg?style=flat-square)
![License](https://img.shields.io/github/license/josefaidt/nWeather.svg?style=flat-square)

> **N**ot another **Weather** API

nWeather is a GraphQL wrapper for the OpenWeatherMap REST endpoint.

## Getting Started

1. Download this repository and unzip the project files
2. Open the project directory in your favorite code editor
3. In `env.sample.js`, input your OpenWeatherMap API Key
4. `mv env.sample.js env.js`
5. Install dependencies: `yarn install`
6. Run the server: `yarn start`
7. Navigate out to `http://localhost:8000/playground`

## Examples

### Current Weather

<details>
<summary>Browse by City Nme</summary>

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

</details>

<details>
<summary>Browse by ZIP</summary>

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

</details>

<details>
<summary>Browse by Coordinates</summary>

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

</details>

### Forecast

Forecast list is in 3-hour intervals (i.e. `limit: 3` returns 3 sets of data across a 9 hour span)

<details>
<summary>Browse by ZIP</summary>

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

</details>

## Follow the Progress

Visit the [kanban board](https://www.notion.so/josefaidt/2facc4e612004ffc8ff2188279b7e54e?v=5cec66a4ee084c64ab4727d1fd5cb863) for more information.
