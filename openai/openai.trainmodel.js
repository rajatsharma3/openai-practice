import axios from "axios";
import dotenv from "dotenv";
import FormData from "form-data";
import * as fs from "fs";

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;

const fileForm = new FormData();
fileForm.append("purpose", "fine-tune");
fileForm.append("file", fs.readFileSync("openai/mydata.jsonl"), "mydata.jsonl");

export const trainModel = async (req, res) => {
  try {
    const file = await axios.post("https://api.openai.com/v1/files", fileForm, {
      headers: {
        ...fileForm.getHeaders(),
        Authorization: `Bearer ${apiKey}`,
      },
    });
    const id = file.data.id;
    const response = await axios.post(
      "https://api.openai.com/v1/fine_tuning/jobs",
      JSON.stringify({
        model: "gpt-3.5-turbo",
        training_file: id,
      }),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );
    res.send(response.data);
  } catch (err) {
    res.send(err);
  }
};
