const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schemas/schemas");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const cors = require(`cors`);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "POST, PUT,GET,DELETE, OPTIONS");
  next();
});

app.use(cors({ credentials: true, origin: "*" }));

//Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * MONGO DB CONNECTION
 */
mongoose
  .connect("mongodb://localhost:27017/personsTask5DB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("Connection to MongoDB was succesfull!"))
  .catch((err) => console.error("Err in connection to MongoDB" + err));

app.use(
  "/crud-api",
  graphqlHTTP((req) => {
    return {
      schema,
    };
  })
);

app.listen(3050, () => {
  console.log("Hello from port: 3050");
});
