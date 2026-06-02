const Session = require("../models/Session");

// GET ALL SESSIONS
const getSessions = async (req, res) => {
  try {
    const sessions = await Session.find();

    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET SESSION BY ID
const getSessionById = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);

    if (!session) {
      return res.status(404).json({
        message: "Session not found",
      });
    }

    res.status(200).json(session);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// CREATE SESSION
const createSession = async (req, res) => {
  try {
    const newSession = new Session(req.body);

    const savedSession = await newSession.save();

    res.status(201).json(savedSession);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE SESSION
const updateSession = async (req, res) => {
  try {
    const updatedSession = await Session.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedSession) {
      return res.status(404).json({
        message: "Session not found",
      });
    }

    res.status(200).json(updatedSession);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE SESSION
const deleteSession = async (req, res) => {
  try {
    const deletedSession = await Session.findByIdAndDelete(req.params.id);

    if (!deletedSession) {
      return res.status(404).json({
        message: "Session not found",
      });
    }

    res.status(200).json({
      message: "Session deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getSessions,
  getSessionById,
  createSession,
  updateSession,
  deleteSession,
};