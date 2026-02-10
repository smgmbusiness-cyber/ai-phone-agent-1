import express from "express";
import { v4 as uuid } from "uuid";

const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "OK", service: "AI Phone Agent" });
});

app.post("/api/call/incoming", (req, res) => {
  const callId = uuid();
  const text = req.body.text || "";

  let reply = "Hei! Hvordan kan jeg hjelpe deg?";

  if (text.toLowerCase().includes("rom")) {
    reply = "Jeg kan hjelpe deg å booke et rom. Hvor mange netter?";
  }

  res.json({
    callId,
    reply
  });
});

app.post("/api/booking/room", (req, res) => {
  res.json({
    bookingId: uuid(),
    status: "CONFIRMED",
    message: "Rommet er booket"
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server kjører på port", PORT);
});
