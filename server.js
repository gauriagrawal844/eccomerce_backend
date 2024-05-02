require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
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

const productRouter = require("./routes/product.routes");
const userRouter = require("./routes/user.routes");

app.use("/api/product", productRouter);
app.use("/api/user", userRouter);
