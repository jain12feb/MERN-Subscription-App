const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const userRoute = require("./routes/user");
const articleRoute = require("./routes/articles");
const subscriptionRoutes = require("./routes/subscriptions");

app.use("/api/v1", userRoute);
app.use("/api/v1", articleRoute);
app.use("/api/v1", subscriptionRoutes);

const port = process.env.PORT || 8080;

mongoose
  .connect(process.env.MONGO_URI)
  .then((conn) => {
    app.listen(port, () => {
      console.log(
        `Server is running at http://localhost:${port}\nDatabase connected to ${conn.connection.name} with ${conn.connection.host}:${conn.connection.port}`
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });
