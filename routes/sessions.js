const express = require("express");
const router = express.Router();

const {
  getSessions,
  getSessionById,
  createSession,
  updateSession,
  deleteSession,
} = require("../controllers/session");

const validateSession = require("../middleware/sessionValidator");

const isAuthenticated = require("../middleware/authenticate");

/**
 * @swagger
 * components:
 *   schemas:
 *     Session:
 *       type: object
 *       required:
 *         - sessionName
 *         - sessionCode
 *         - facilitator
 *         - duration
 *         - category
 *         - schedule
 *         - level
 *       properties:
 *         sessionName:
 *           type: string
 *           example: Public Health Implementation
 *         sessionCode:
 *           type: string
 *           example: PHI 421
 *         facilitator:
 *           type: string
 *           example: Professor Fredric Khan
 *         duration:
 *           type: number
 *           example: 2
 *         category:
 *           type: string
 *           example: Health Practical
 *         schedule:
 *           type: string
 *           example: 10am-12noon
 *         level:
 *           type: string
 *           example: Intermediate
 */

/**
 * @swagger
 * /sessions:
 *   get:
 *     summary: Get all sessions
 *     tags:
 *       - Sessions
 *     responses:
 *       200:
 *         description: Successfully retrieved sessions
 *       500:
 *         description: Server Error
 */
router.get("/", getSessions);

/**
 * @swagger
 * /sessions/{id}:
 *   get:
 *     summary: Get session by ID
 *     tags:
 *       - Sessions
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Session MongoDB ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Session found
 *       404:
 *         description: Session not found
 *       500:
 *         description: Server Error
 */
router.get("/:id", getSessionById);

/**
 * @swagger
 * /sessions:
 *   post:
 *     summary: Create a new session
 *     tags:
 *       - Sessions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Session'
 *     responses:
 *       201:
 *         description: Session created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server Error
 */

/* FIXED: removed duplicate route */
router.post("/", isAuthenticated, validateSession, createSession);

/**
 * @swagger
 * /sessions/{id}:
 *   put:
 *     summary: Update session
 *     tags:
 *       - Sessions
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Session MongoDB ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Session'
 *     responses:
 *       200:
 *         description: Session updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Session not found
 *       500:
 *         description: Server Error
 */

/* FIXED: removed duplicate route */
router.put("/:id", isAuthenticated, validateSession, updateSession);

/**
 * @swagger
 * /sessions/{id}:
 *   delete:
 *     summary: Delete session
 *     tags:
 *       - Sessions
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Session MongoDB ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Session deleted successfully
 *       404:
 *         description: Session not found
 *       500:
 *         description: Server Error
 */

/* FIXED: removed duplicate route */
router.delete("/:id", isAuthenticated, deleteSession);

module.exports = router;