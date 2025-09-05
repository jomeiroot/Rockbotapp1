import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const ROCKBOT_BASE = process.env.ROCKBOT_BASE_URL;   // e.g. https://api.rockbot.com
const ROCKBOT_KEY  = process.env.ROCKBOT_API_KEY;    // keep in .env (server-side only)

// Example: “now playing” (you’ll adjust path to the actual endpoint you get from Rockbot)
app.get("/api/now-playing/:venueId", async (req, res) => {
    const r = await fetch(`${ROCKBOT_BASE}/venues/${req.params.venueId}/now-playing`, {
        headers: { Authorization: `Bearer ${ROCKBOT_KEY}` }
    });
    const data = await r.json();
    res.status(r.status).json(data);
});

// Example: request a track
app.post("/api/request", async (req, res) => {
    const { venueId, trackId } = req.body;
    const r = await fetch(`${ROCKBOT_BASE}/venues/${venueId}/requests`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${ROCKBOT_KEY}`
        },
        body: JSON.stringify({ trackId })
    });
    const data = await r.json();
    res.status(r.status).json(data);
});

app.listen(5174, () => console.log("Proxy running on http://localhost:5174"));