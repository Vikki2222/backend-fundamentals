require("dotenv").config();

const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");

const ownersRouter = require("./routes/ownersRouter");
const productsRouter = require("./routes/productsRouter");
const usersRouter = require("./routes/usersRouter");
const indexRouter = require("./routes/index");


require("./config/mongoose-connection");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Static files
app.use(express.static(path.join(__dirname, "public")));

// View engine
app.set("view engine", "ejs");

// Routes
app.use("/users", usersRouter);
app.use("/owners", ownersRouter);
app.use("/products", productsRouter);


app.use("/", indexRouter);

// Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});