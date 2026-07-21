import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import membersRouter from "./routes/members.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/bangdream", express.static(path.join(__dirname, "public", "bangdream")));

app.use("/api", membersRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
