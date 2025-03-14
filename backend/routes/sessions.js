const express = require('express');
const Session = require('../models/session');
const router = express.Router();

// Create a new session
router.post('/', async (req, res) => {
  const { sessionName, trainer, startTime, endTime, availableSlots } = req.body;

  try {
    const session = new Session({ sessionName, trainer, startTime, endTime, availableSlots });
    await session.save();
    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all available sessions
router.get('/', async (req, res) => {
  try {
    const sessions = await Session.find(); // No populate here
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Book a session
router.post('/:id', async (req, res) => {
  const sessionId = req.params.id;
  const userId = req.user.id;

  try {
    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    if (session.availableSlots <= 0) {
      return res.status(400).json({ message: 'No slots available' });
    }

    session.availableSlots -= 1;
    await session.save();
    res.status(200).json({ message: 'Session booked successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
