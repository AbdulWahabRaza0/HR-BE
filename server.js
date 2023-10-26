require("dotenv").config();
const express = require("express");
const app = express();
const { connectDB } = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const PersonalRoutes = require("./routes/personalRoute");
const departmentRoutes = require("./routes/departmentRoute");
const { notFound, errorHandler } = require("./middleware/error");
const { swaggerDocs } = require("./config/swagger");
const helmet = require("helmet");
const cors = require("cors");

app.use(express.json());
app.use(cors());

connectDB();
const cspDefaults = helmet.contentSecurityPolicy.getDefaultDirectives();
delete cspDefaults["upgrade-insecure-requests"];

app.use(
  helmet({
    contentSecurityPolicy: { directives: cspDefaults },
  })
);
app.get("/", (req, res) => {
  res.status(200).json("HRS Server");
});
const port = process.env.PORT || 5000;
app.use("/api/user", userRoutes);
app.use("/api/person", PersonalRoutes);
app.use("/api/department", departmentRoutes);
swaggerDocs(app, port);
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log("listening to port ", port);
});

module.exports = app;
