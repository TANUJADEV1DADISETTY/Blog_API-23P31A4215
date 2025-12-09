const express = require("express");
const app = express();
const authorRoutes = require("./routes/authorRoutes");
const postRoutes = require("./routes/postRoutes");
require("./models"); // sync db

app.use(express.json());

app.use("/authors", authorRoutes);
app.use("/posts", postRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));
