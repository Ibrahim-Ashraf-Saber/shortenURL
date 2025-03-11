import express from "express";
import urlModel from "../models/urlModel";
import { nanoid } from "nanoid";

const router = express.Router();

// Post EndPoint
router.post("/", async (req, res): Promise<any> => {
  try {
    const { originalURL } = req.body;
    const shortURL = nanoid(6); // Unique 6 Chars
    const newURL = await urlModel.create({ originalURL, shortURL });
    await newURL.save();
    return res
      .status(201)
      .json({ shortURL: `http://localhost:5000/${shortURL}` });
  } catch (err: any) {
    console.error("Error in POST /:", err);
    return res.status(500).json({ error: `Server Error: ${err.message}` });
  }
});

// Get EndPoint
router.get("/:shortURL", async (req, res): Promise<any> => {
  try {
    const { shortURL } = req.params;
    const data = await urlModel.findOne({ shortURL });

    if (!data) {
      return res.status(404).json({ error: "URL not found!" });
    }

    return res.redirect(data.originalURL);
  } catch (err: any) {
    console.error("Error in GET /:shortURL:", err);
    return res.status(500).json({ error: `Server Error: ${err.message}` });
  }
});

export default router;
