require("dotenv").config();
const express = require("express");
const app = express();
const { connectDB } = require("./config/db");
const PersonalRoutes = require("./routes/personalRoute");
const departmentRoutes = require("./routes/departmentRoute");
app.use(express.json());
connectDB();
app.get("/", (req, res) => {
  res.status(200).json("Hello");
});
app.use("/api/person", PersonalRoutes);
app.use("/api/department", departmentRoutes);

const port = process.env.PORT;
app.listen(port, () => {
  console.log("listening to port ", port);
});