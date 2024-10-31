import express from "express";
import { exportTasksController } from "./controllers/export.controller";

const app = express();
const PORT = 3000;

app.get("/export", exportTasksController);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
