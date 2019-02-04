const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true
  })
);

app.listen(PORT, () => {
  console.log(`GraphQL Server is running on port ${PORT}`);
});
