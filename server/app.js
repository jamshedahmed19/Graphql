const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

//allow cross-origin requests
app.use(cors());
// middleware for express-grapghql
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

const dbURI =
  "mongodb+srv://jam19:898787@cluster0.2c0b5.mongodb.net/gql-tuts?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(4000, () => {
  console.log("listening for requests");
});
