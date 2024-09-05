import express, { json } from "express";
import router from "./routes";

const app = express();
app.set("view options", { pretty: true });

app.use(json());

app.use("/api", router);

export default app;
