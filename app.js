const express = require("express");
const { initializeDatabase } = require("./models");
const authorRoutes = require("./routes/authorRoutes");
const postRoutes = require("./routes/postRoutes");

const app = express();
app.use(express.json());

// Routes
app.use("/authors", authorRoutes);
app.use("/posts", postRoutes);

// Start DB and server
initializeDatabase().then(() => {
    console.log("Database synced.");
    app.listen(3000, () => console.log("Server running on port 3000"));
});
