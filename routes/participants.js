const express = require("express");

const router = express.Router();

const {
  getParticipants,
  getParticipantById,
  createParticipant,
  updateParticipant,
  deleteParticipant,
} = require("../controllers/participants");

const validateParticipant = require("../middleware/participantValidator");

/**
 * @swagger
 * components:
 *   schemas:
 *     Participant:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - age
 *         - email
 *         - session
 *         - level
 *         - gender
 *       properties:
 *         firstName:
 *           type: string
 *           example: Frank
 *         lastName:
 *           type: string
 *           example: Harrison
 *         age:
 *           type: number
 *           example: 30
 *         email:
 *           type: string
 *           example: frank@email.com
 *         session:
 *           type: string
 *           description: MongoDB ObjectId referencing Session
 *           example: 64f1a9c2b7a1e2d9c1234567
 *         level:
 *           type: string
 *           example: Intermediate
 *         gender:
 *           type: string
 *           example: Male
 */

/**
 * @swagger
 * /participants:
 *   get:
 *     summary: Get All Participants
 *     tags:
 *       - Participants
 *     responses:
 *       200:
 *         description: Successfully retrieved participants
 *       500:
 *         description: Server Error
 */
router.get("/", getParticipants);

/**
 * @swagger
 * /participants/{id}:
 *   get:
 *     summary: Get Participant by ID
 *     tags:
 *       - Participants
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Participant MongoDB ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Participant found
 *       404:
 *         description: Participant not found
 *       500:
 *         description: Server Error
 */
router.get("/:id", getParticipantById);

/**
 * @swagger
 * /participants:
 *   post:
 *     summary: Create a New Participant
 *     tags:
 *       - Participants
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Participant'
 *     responses:
 *       201:
 *         description: Participant created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server Error
 */
router.post("/", validateParticipant, createParticipant);
router.post("/", isAuthenticated, validateParticipant, createParticipant);
/**
 * @swagger
 * /participants/{id}:
 *   put:
 *     summary: Update Participant
 *     tags:
 *       - Participants
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Participant MongoDB ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Participant'
 *     responses:
 *       200:
 *         description: Participant updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Participant not found
 *       500:
 *         description: Server Error
 */
router.put("/:id", validateParticipant, updateParticipant);
router.put("/:id", isAuthenticated, validateParticipant, updateParticipant);
/**
 * @swagger
 * /participants/{id}:
 *   delete:
 *     summary: Delete Participant
 *     tags:
 *       - Participants
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Participant MongoDB ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Participant deleted successfully
 *       404:
 *         description: Participant not found
 *       500:
 *         description: Server Error
 */
router.delete("/:id", deleteParticipant);
router.delete("/:id", isAuthenticated, deleteParticipant);

module.exports = router;