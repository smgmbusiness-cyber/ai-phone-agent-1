const express = require('express');
const { v4: uuid } = require('uuid');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Helse-sjekk
app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'AI Phone Agent' });
});

// Når en samtale starter (webhook fra Retell/Twilio)
app.post('/api/call/incoming', (req, res) => {
  const callId = uuid();
  const text = req.body.text || '';

  let reply = 'Hei! Hvordan kan jeg hjelpe deg?';

  if (text.toLowerCase().includes('rom')) {
    reply = 'Jeg kan hjelpe deg å booke et rom. Hvor mange netter?';
  }

  res.json({
    callId,
    reply
  });
});

// Booking av rom
app.post('/api/booking/room', (req, res) => {
  res.json({
    bookingId: uuid(),
    status: 'CONFIRMED'
  });
});

// Start serveren
app.listen(PORT, () => {
  console.log(`Server kjører på port ${PORT}`);
});
