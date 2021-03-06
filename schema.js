const axios = require("axios");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} = require("graphql");

const BASE_URL = 'http://localhost:4000';

const ReviewType = new GraphQLObjectType({
  name: "ReviewType",
  description: '...',
  fields: () => ({
    label: { type: GraphQLString },
    value: { type: GraphQLString },
    percent: { type: GraphQLInt }
  })
});

const ImageType = new GraphQLObjectType({
  name: "ImageType",
  description: '...',
  fields: () => ({
    sm: { type: GraphQLString },
    md: { type: GraphQLString },
  })
});

const HeroImageType = new GraphQLObjectType({
  name: "HeroImageType",
  description: '...',
  fields: () => ({
    label: { type: GraphQLString },
    hero: { type: ImageType },
  })
});

const DetailsType = new GraphQLObjectType({
  name: "DetailsType",
  description: '...',
  fields: () => ({
    id: { type: GraphQLString },
    make: { type: GraphQLString },
    model: { type: GraphQLString },
    year: { type: GraphQLInt },
    zipCode: { type: GraphQLString },
    image: { type: HeroImageType}
  })
});

const TrimType = new GraphQLObjectType({
  name: "TrimType",
  description: '...',
  fields: () => ({
    id: { type: GraphQLString },
    make: { type: GraphQLString },
    model: { type: GraphQLString },
    year: { type: GraphQLInt },
    bodyType: { type: new GraphQLList(GraphQLString) },
    doors: { type: new GraphQLList(GraphQLString) }
  })
});

const ExpertReviewsType = new GraphQLObjectType({
  name: "ExpertReviewsType",
  description: '...',
  fields: () => ({
    id: { type: GraphQLID },
    author: { type: GraphQLString },
    date: { type: GraphQLString },
    reviews: { type: new GraphQLList(ReviewType) }
  })
});

const VehicleType = new GraphQLObjectType({
  name: "Vehicle",
  description: '...',
  fields: () => ({
    id: { type: GraphQLString },
    vehicleDetails: { type: DetailsType },
    trims: { type: new GraphQLList(TrimType) },
    expertReviews: { type: ExpertReviewsType },
  })
});

// root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: '...',
  fields: {
    vehicle: {
      type: VehicleType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        return axios
          .get(`${BASE_URL}/vehicles/${args.id}`)
          .then(res => res.data);
      }
    },
    vehicles: {
      type: new GraphQLList(VehicleType),
      resolve() {
        return axios
          .get(`${BASE_URL}/vehicles`)
          .then(res => res.data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
