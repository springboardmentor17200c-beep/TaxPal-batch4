const app = require("./app");
const connectDB = require("./config/db");
const env = require("./config/env");

connectDB();

app.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT}`);
});
