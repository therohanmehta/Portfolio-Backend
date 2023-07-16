const express = require("express");

const cors = require("cors");

const mongoose = require("mongoose");

const db =
  "mongodb+srv://rohandhn786:sBhGxLRPT97Rz7R2@portfoliodata.gbt9wgc.mongodb.net/portfoliodata";

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(db);
  console.log("database connected");
}

const feedbackSchema = new mongoose.Schema({
  name: String,
  message: String,
  time: String,
  mac: String,
  ip: String,
});

const FeedbackData = mongoose.model("feedbackData", feedbackSchema);

const server = express();

server.use(express.urlencoded({ extended: true }));

server.use(express.json());

server.use(cors());

server.get("/data", async (req, res) => {});

server.get("/jsondata", (req, res) => {
  res.json({
    name: "rohan",
  });
});

server.post("/data", async (req, res) => {
  const feedbackData = new FeedbackData();
  feedbackData.name = req.body.name;
  feedbackData.time = req.body.time;
  feedbackData.message = req.body.message;
  feedbackData.mac = req.body.mac;
  feedbackData.ip = req.body.ip;

  const sendData = await feedbackData.save();
  console.log(sendData);
});

server.listen(8080, () => {
  console.log("server running");
});
