import express from "express";
import cors from "cors";
const app = express();

// Allow requests from your Next.js domain
app.use(
  cors({
    origin:
      "https://65f3c3d8ec00e6036ff3d2eb--incandescent-sfogliatella-3ba504.netlify.app/",
  })
);
