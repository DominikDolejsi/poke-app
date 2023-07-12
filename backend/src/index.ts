import server from "./server.js";
import "dotenv/config";

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server up and ready on port ${PORT}`);
});
