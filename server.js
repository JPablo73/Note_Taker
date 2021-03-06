const express = require("express");

const app = express();

const PORT = process.env.PORT || 8080;

//handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// required routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

app.listen(PORT, () => {
  console.log(`LISTENING ON PORT: ${PORT}`);
});
