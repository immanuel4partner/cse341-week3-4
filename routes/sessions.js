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
 *         sessionCode:
 *           type: string
 *         facilitator:
 *           type: string
 *         duration:
 *           type: number
 *         category:
 *           type: string
 *         schedule:
 *           type: string
 *         level:
 *           type: string
 *       example:
 *         sessionName: Public Health Implementation
 *         sessionCode: PHI 421
 *         facilitator: Professor Fredric Khan
 *         duration: 2
 *         category:  Health Practical
 *         schedule:  10am-12noon
 *         level: Intermediate
 */

/**
 * @swagger
 * /sessions:
 *   get:
 *     summary: Get all Sessions
 *     tags:
 *       - Sessions
 *     responses:
 *       200:
 *         description: List of Sessions
 */
router.get("/", getSessions);

/**
 * @swagger
 * /sessions/{id}:
 *   get:
 *     summary: Get Session by ID
 *     tags:
 *       - Sessions
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Session Found
 */
router.get("/:id", getSessionById);

/**
 * @swagger
 * /sessions:
 *   post:
 *     summary: Create a Session
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
 *         description: Session Created
 */
router.post("/", validateSession, createSession);

/**
 * @swagger
 * /sessions/{id}:
 *   put:
 *     summary: Update a Session
 *     tags:
 *       - Sessions
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
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
 *         description: Session Updated
 */
router.put("/:id", validateSession, updateSession);

/**
 * @swagger
 * /sessions/{id}:
 *   delete:
 *     summary: Delete a Session
 *     tags:
 *       - Sessions
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Session Deleted
 */
router.delete("/:id", deleteSession);

module.exports = router;