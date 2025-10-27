import express from "express";
import { registerUser } from "../controllers/emailController.js";

const router = express.Router();
/**
 * @swagger
 * /api/email/register:
 *   post:
 *     summary: Registrar usuario y enviar correo
 *     tags: [Email]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: hardy@example.com
 *               name:
 *                 type: string
 *                 example: hardy
 *     responses:
 *       200:
 *         description: Email enviado correctamente
 *       500:
 *         description: Error del servicio al enviar email
 */

router.post("/register", registerUser)

export default router;