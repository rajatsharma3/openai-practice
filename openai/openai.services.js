import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;
const endpoint = "https://api.openai.com/v1/chat/completions";

const data = {
  model: "gpt-3.5-turbo",
  messages: [
    {
      role: "user",
      content: "",
    },
  ],
};

export const getAnswer = async (req, res) => {
  try {
    const msg = req.body.question;
    data.messages[0].content = msg;

    const response = await axios.post(endpoint, JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    });

    res.send(response.data);
    res.send(
      `${response.data.choices[0].message.role}=>${response.data.choices[0].message.content}`
    );
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send(error);
  }
};
