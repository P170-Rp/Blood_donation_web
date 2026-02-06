const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend")));

app.use("/auth", require("./routes/auth"));


app.get("/", (req, res) => {
   res.sendFile(path.join(__dirname, "../frontend/register.html"));
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
