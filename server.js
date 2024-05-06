require("dotenv").config();
require("express-async-errors");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const productRouter = require("./routes/product.routes");
const userRouter = require("./routes/user.routes");
const { sendInternalErrorResponse } = require("./utils/response");
const app = express();

const port = process.env.Port;

app.use(express.json());
app.use(cors());
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

mongoose.connect(process.env.MONGO_URI);

mongoose.connection.on("open", () => console.log("Connected to db"));
mongoose.connection.on("error", (err) => {
  console.log(err);
});

app.use("/api/product", productRouter);
app.use("/api/user", userRouter);

app.use((err, req, res, next) => {
  console.log(err);
  return sendInternalErrorResponse(res, err);
});