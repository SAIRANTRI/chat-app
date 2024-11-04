import express from "express";
import dotenv from "dotenv";
import connectToMongoDB from "./db/connectToMongoDB.js";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth/", authRoutes);
app.use("/api/messages/", messageRoutes);

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server started on port ${PORT}`);
});
