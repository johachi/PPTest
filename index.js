const { server } = require("./server/index");

const PORT = process.env.PORT || 4000;
const app = server();

app.listen(PORT, () => {
  console.log("Server listening on Port", PORT);
});
