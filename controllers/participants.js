const Participant = require("../models/participants");

// GET ALL PARTICIPANTS
const getParticipants = async (req, res) => {
  try {
    const participants = await Participant.find();
    res.status(200).json(participants);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// GET PARTICIPANT BY ID
const getParticipantById = async (req, res) => {
  try {
    const participant = await Participant.findById(req.params.id).populate("session");

    if (!participant) {
      return res.status(404).json({
        message: "Participant not found",
      });
    }

    res.status(200).json(participant);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// CREATE PARTICIPANT
const createParticipant = async (req, res) => {
  try {
    const newParticipant = new Participant(req.body);
    const savedParticipant = await newParticipant.save();

    res.status(201).json(savedParticipant);
  } catch (error) {
    // VALIDATION ERROR 
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation error",
        error: error.message,
      });
    }

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// UPDATE PARTICIPANT
const updateParticipant = async (req, res) => {
  try {
    const updatedParticipant = await Participant.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedParticipant) {
      return res.status(404).json({
        message: "Participant not found",
      });
    }

    res.status(200).json(updatedParticipant);
  } catch (error) {
    // VALIDATION ERROR 
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation error",
        error: error.message,
      });
    }

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// DELETE PARTICIPANT
const deleteParticipant = async (req, res) => {
  try {
    const deletedParticipant = await Participant.findByIdAndDelete(req.params.id);

    if (!deletedParticipant) {
      return res.status(404).json({
        message: "Participant not found",
      });
    }

    res.status(200).json({
      message: "Participant deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  getParticipants,
  getParticipantById,
  createParticipant,
  updateParticipant,
  deleteParticipant,
};