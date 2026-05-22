import express from "express";
import cors from "cors";

import eventRoute from "./routes/eventRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import pembicaraRoute from "./routes/pembicaraRoute.js";

const app = express();
const port = 3000;

app.use(cors({
  origin: "https://uts-pemweb-2-7qga.vercel.app/", 
  credentials: true
}));
app.use(express.json());

app.get("/", (req, res) => {
res.send("Ini adalah api untuk invofest!");
});

app.use("/events", eventRoute);
app.use("/categories", categoryRoute);
app.use("/pembicara", pembicaraRoute);

app.listen(port, () => {
console.log(`Server is running on http://localhost:${port}`);
});