# graphql-express-server
========================

Prove of Concept GraphQL/Express server 

## Installation

```sh
npm install
```

## Simple Setup

start json-server seed data
```sh
npm run json:server
```

start GraphQL server
```sh
npm run dev:server
```

open browser on http://localhost:4000/graphq

get vehicles: 
```$xslt
{
  vehicles {
    id
    vehicleDetails {
      id
      make
      model
      year
    }
    trims {
      id
      bodyType
      doors
    }
  }
}
```

get vehicle: 
```$xslt
{
  vehicle(id: "acura_ilx_2018") {
    id
    vehicleDetails {
      id
      make
      model
      year
      zipCode
    }
  }
}
```

