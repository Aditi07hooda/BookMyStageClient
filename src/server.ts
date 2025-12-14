import mongoose from "mongoose";
import app from "./app";
import multer from "multer";
import { EvaluatorEligibleEvent } from "./app/modules/evaluators/evaluatorEligibleEvent.model";
const port = process.env.PORT || 5000;

require("dotenv").config();

// connect with mongodb atlas
const mongoUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

const mongooseOptions: any = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, // Set a longer timeout (default is 30000)
};
const upload = multer({ dest: "uploads/" });
async function mongodbConnect() {
  try {
    console.log("database url : " + mongoUrl);
    await mongoose.connect(mongoUrl, mongooseOptions);
    console.log("database connected");
    app.get("/", (req, res) => {
      res.send("Website is running");
    });
    app.listen(port, () => {
      console.log(` app listening on port ${port}`);
    });
  } catch (e) {
    console.log("server err", e);
  }
}

mongodbConnect();
