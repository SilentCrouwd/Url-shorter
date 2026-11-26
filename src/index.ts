import express from "express";
import router from "./router/router.js";
import { initialLoadUrls } from "./router/url/url_db/url.db.js";

initialLoadUrls();
const app = express();
const port = process.env.port || "3000";

app.use(express.json());

app.use("/api", router);

app.listen(port, () => {
  console.log(`Server running on port:${port}`);
});
