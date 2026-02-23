import express from "express";
import supabase from "./utils/supabase";
import userRouter from "./routes/user.routes";

const app = express();
const port = 8080;

app.use(express.json());

app.use("/api/users", userRouter);

app.listen(port, async () => {
  if (!supabase) {
    console.log(`[-]: Supabase is not connected?`);
  }
  console.log(`[+]: Server running at http://localhost:${port}`);
});