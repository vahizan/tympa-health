import express from "express";
import cors from "cors";
import { recordsRouter } from "./routers/recordsRouter";

const app = express();
const PORT = process.env.NODE_DOCKER_PORT || 8080;

let corsOptions = {
  origin: process.env.CLIENT_ORIGIN || "http://localhost:3001",
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(recordsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
