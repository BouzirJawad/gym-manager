const express = require('express');
const Session = require('../models/session');
const router = express.Router();

// Create a new session
router.post('/', async (req, res) => {
  try {
    const { sessionName, coach, startTime, endTime, availableSlots } = req.body;

    const session = new Session({
      sessionName,
      coach,
      startTime,
      endTime,
      availableSlots,
    });

    await session.save();
    res.status(201).json({ message: 'Session created successfully!', session });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all available sessions
router.get('/', async (req, res) => {
  try {
    const sessions = await Session.find();
    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Book a session
router.post('/:id/book', async (req, res) => {
  try {
    const sessionId = req.params.id;
    const { userId } = req.body; // Pass userId in request body

    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    if (session.availableSlots <= 0) {
      return res.status(400).json({ message: 'No slots available' });
    }

    session.availableSlots -= 1;
    await session.save();
    res.status(200).json({ message: 'Session booked successfully', session });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    console.log('Request Params:', req.params);
    console.log('Request Body:', req.body);
    
    const sessionId = req.params.id;
    const { sessionName, coach, startTime, endTime, availableSlots } = req.body;

    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    // Update the session details
    session.sessionName = sessionName || session.sessionName;
    session.coach = coach || session.coach;
    session.startTime = startTime || session.startTime;
    session.endTime = endTime || session.endTime;
    session.availableSlots = availableSlots || session.availableSlots;

    await session.save();
    res.status(200).json({ message: 'Session updated successfully', session });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a session
router.delete('/:id', async (req, res) => {
  try {
    const session = await Session.findByIdAndDelete(req.params.id);
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }
    res.status(200).json({ message: 'Session deleted successfully'});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
