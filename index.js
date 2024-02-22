import express from "express";
import dotenv from "dotenv";
import router from "./openai/openai.routes.js";
dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.use("/openai", router);

app.listen(PORT, () => {
  console.log(`app is listening at ${PORT}`);
});
