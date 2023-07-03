import express from "express";
import cors from "cors";
import { recordsRouter } from "./routers/recordsRouter";

const app = express();
const PORT = process.env.NODE_DOCKER_PORT;

let corsOptions = {
  origin: process.env.CLIENT_ORIGIN || "http://localhost:8081",
};
console.log("PORT:", PORT);
app.use(cors());
app.use(express.json());

app.use(recordsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
