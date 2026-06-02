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
 *         lastName:
 *           type: string
 *         age:
 *           type: number
 *         email:
 *           type: string
 *         session:
 *           type: string
 *           description: Session ID (MongoDB ObjectId reference)
 *         level:
 *           type: string
 *         gender:
 *           type: string
 *       example:
 *         firstName: Frank
 *         lastName: Harrison
 *         age: 30
 *         email: harry@outlook.com
 *         session: 64f1a9c2b7a1e2d9c1234567
 *         level: Intermediate
 *         gender: Male
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
 *         description: List of All Participants
 *       500:
 *         description: Server Error
 */
router.get("/", getParticipants);

/**
 * @swagger
 * /participants/{id}:
 *   get:
 *     summary: Get a Participant by ID
 *     tags:
 *       - Participants
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB Participant ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Participant Found
 *       404:
 *         description: Participant not Found
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
 *         description: Participant Created Successfully
 *       400:
 *         description: Validation Error
 *       500:
 *         description: Server Error
 */
router.post("/", validateParticipant, createParticipant);

/**
 * @swagger
 * /participants/{id}:
 *   put:
 *     summary: Update a Participant
 *     tags:
 *       - Participants
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB Participant ID
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
 *         description: Participant Updated Successfully
 *       400:
 *         description: Validation Error
 *       404:
 *         description: Participant Not Found
 *       500:
 *         description: Server Error
 */
router.put("/:id", validateParticipant, updateParticipant);

/**
 * @swagger
 * /participants/{id}:
 *   delete:
 *     summary: Delete a Participant
 *     tags:
 *       - Participants
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB Participant ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Participant Deleted Successfully
 *       404:
 *         description: Participant Not Found
 *       500:
 *         description: Server Error
 */
router.delete("/:id", deleteParticipant);

module.exports = router;