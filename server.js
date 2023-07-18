const express = require("express");
const approute=require('./route/route')
const app = express();
app.use(express.json())
app.use("/api",approute)


app.listen(5000, () => {
  console.log("on port 5000");
});
