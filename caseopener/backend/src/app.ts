import express from "express";
import cors from "cors";
import { getCaseNames, getCaseData, openCase } from "./cases";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/cases", (req, res) => {
  res.json(getCaseNames());
});

app.get("/cases/:name", (req, res) => {
  const caseData = getCaseData(req.params.name);
  if (!caseData) return res.status(404).send("Case not found");
  res.json(caseData);
});

app.post("/cases/:name/open", (req, res) => {
  const result = openCase(req.params.name);
  if (!result) return res.status(404).send("Case not found");
  res.json(result);
});

app.listen(3001, () => console.log("Backend running on http://localhost:3001"));
