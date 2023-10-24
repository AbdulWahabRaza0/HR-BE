const express = require("express");
const router = express.Router();
const { protect, protectAdmin } = require("../middleware/auth.js");
const { register, login, allUsers } = require("../controller/user");
/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get all users
 *     security:
 *       - bearerAuth: []  # Requires a bearer token
 *     responses:
 *       200:
 *         description: Successfully retrieved users
 *       400:
 *         description: Failed to retrieve users
 */
router.get("/", protect, protectAdmin, allUsers);
/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               type:
 *                 type: string
 *               password:
 *                 type: string
 *           required:
 *             - name
 *             - email
 *             - password
 *     security:
 *       - bearerAuth: []  # Requires a bearer token
 *     responses:
 *       201:
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 type:
 *                   type: string
 *                 token:
 *                   type: string
 *       400:
 *         description: Bad request - Insufficient details or user already exists
 */
router.post("/register", register);
/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *           required:
 *             - email
 *             - password
 *     security:
 *       - BearerAuth: []  # Requires a bearer token
 *     responses:
 *       200:
 *         description: User successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 token:
 *                   type: string
 *       400:
 *         description: Bad request - Insufficient details or user not found
 */
router.post("/login", login);
module.exports = router;
