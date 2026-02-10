const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'AI Phone Agent' });
});

app.post('/api/call/incoming', (req, res) => {
  const callId = uuidv4();
  const text = req.body.text || '';

  let reply = 'Hei! Hvordan kan jeg hjelpe deg?';

  if (text.toLowerCase().includes('rom')) {
    reply = 'Jeg kan hjelpe deg å booke et rom. Hvor mange netter?';
  }

  res.json({
    callId,
    reply,
  });
});

app.post('/api/booking/room', (req, res) => {
  res.json({
    bookingId: uuidv4(),
    status: 'CONFIRMED',
  });
});

app.listen(PORT, () => {
  console.log(`Server kjører på port ${PORT}`);
});
