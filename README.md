graphql-express-server
========================

Prove of Concept GraphQL/Express server 

## Installation

```sh
npm install
```

## Start Server

start 
start GraphQL server
```sh
npm run dev
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
  vehicle(id: "jeep_wrangler_2018") {
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

