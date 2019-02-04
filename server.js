const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema");
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Allow cross-origin
app.use(cors());

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
