import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import urlRoute from "./routers/urlRoute";

const app = express();
const port = 5000;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5175",
  })
);

// Connect MongoDB
mongoose
  .connect("mongodb://localhost:27017/shortenURL")
  .then(() => console.log("MongoDB Connected!"))
  .catch((err) => console.error("MongoDB Connection Failed: ", err));

// Use Router
app.use("/", urlRoute);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
