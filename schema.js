const axios = require("axios");
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema,
} = require("graphql");

const ApiKey = "17360273-855f6091d1678ed63207bb8c2";

const imageType = new GraphQLObjectType({
  name: "Images",
  fields: () => ({
    tags: { type: GraphQLString },
    views: { type: GraphQLInt },
    downloads: { type: GraphQLInt },
    likes: { type: GraphQLInt },
    comments: { type: GraphQLInt },
    webformatURL: { type: GraphQLString },
    largeImageURL: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    photos: {
      type: new GraphQLList(imageType),
      args: {
        query: { type: GraphQLString },
      },
      resolve(parent, args) {
        return axios
          .get(
            `https://pixabay.com/api/?q=${args.query}&page=1&key=${ApiKey}&image_type=photo&orientation=horizontal&per_page=36`
          )
          .then((res) => res.data.hits);
      },
    },
  },
});
module.exports = new GraphQLSchema({
  query: RootQuery,
});
