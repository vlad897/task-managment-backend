import express, { Express } from "express";
import authRouter from "./routes/auth.js";
import cors from "cors";

const app: Express = express();
const PORT: number = 3001;

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log("Server OK");
});
