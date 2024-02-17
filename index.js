import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import AuthRoutes from "./routes/AuthRoutes.js";
import CommentRoutes from "./routes/CommentRoutes.js";
import PostRoutes from "./routes/PostRoutes.js";
import UserRoutes from "./routes/UserRoutes.js";
import ProfileRoutesData from "./routes/ProfileRoute.js"

const port = process.env.PORT;

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cors({
    origin: true,
    methods: true,
    credentials: true,
  })
);

app.get("/", (req, res) => {
  return res.status(200).json({
    "yes baby": "its going",
  });
});

app.use("/api/auth", AuthRoutes);
app.use("/api/comments", CommentRoutes);
app.use("/api/post", PostRoutes);
app.use("/api/user", UserRoutes);
app.use("/api/profile",ProfileRoutesData);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "server not respond !";
  const success = err.success || false;
  return res.status(status).json({
    status,
    message,
    success,
  });
});

app.listen(port, () => {
  console.log(`server start at the port of ${port}`);
});
