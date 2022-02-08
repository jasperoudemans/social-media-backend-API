const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const api = require("./routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", api);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
