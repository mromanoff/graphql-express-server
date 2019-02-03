const axios = require("axios");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require("graphql");

const DetailsType = new GraphQLObjectType({
  name: "DetailsType",
  fields: () => ({
    id: { type: GraphQLString },
    make: { type: GraphQLString },
    model: { type: GraphQLString },
    year: { type: GraphQLInt },
    zipCode: { type: GraphQLString }
  })
});

const TrimType = new GraphQLObjectType({
  name: "VehicleTrimType",
  fields: () => ({
    id: { type: GraphQLString },
    make: { type: GraphQLString },
    model: { type: GraphQLString },
    year: { type: GraphQLInt },
    bodyType: { type: new GraphQLList(GraphQLString) },
    doors: { type: new GraphQLList(GraphQLString) }
  })
});

const VehicleType = new GraphQLObjectType({
  name: "Vehicle",
  fields: () => ({
    id: { type: GraphQLString },
    vehicleDetails: { type: DetailsType },
    trims: { type: new GraphQLList(TrimType)}
  })
});

// root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    vehicle: {
      type: VehicleType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:3000/vehicles/${args.id}`)
          .then(res => res.data);
      }
    },
    vehicles: {
      type: new GraphQLList(VehicleType),
      resolve() {
        return axios
          .get(`http://localhost:3000/vehicles`)
          .then(res => res.data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
