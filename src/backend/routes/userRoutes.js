import express from 'express';
import { userController } from '../controllers/userController.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         email:
 *           type: string
 *           example: hardy@gmail.com
 *         name:
 *           type: string
 *           example: hardy
 */

/**
 * @swagger
 * /api/users:
 *  get:
 *     summary: Obtener todos los usuarios
 *     tags: [Users]
 *     responses:
 *        200:
 *          description: OK
 */
router.get('/',userController.getUsers);
/**
 * @swagger
 * /api/users:
 *  post:
 *    summary: Crear nuevo usuario
 *    tags: [Users]
 *    requestBody: 
 *      require: true
 *      content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                email: 
 *                  type: string
 *                  example: hardy@gmail.com
 *                name: 
 *                  type: string
 *                  example: hardy
 *    responses:
 *      201:
 *        description: Usuario creado correctamente
 *        content:
 *          application/json:
 *           $ref: '#/components/schemas/User'
 *      400:
 *        description: Datos invalidos
 *      500:
 *        description: Error del servidor
 */
router.post('/',userController.createUser);
/**
 * @swagger
 * /api/users:
 *   put:
 *     summary: Actualizar un Usuario existente
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 10
 *               name:
 *                 type: string
 *                 example: Hardyzzz
 *               email:
 *                 type: string
 *                 example: hardyzzz@gmail.com
 *               role:
 *                 type: string
 *                 example: admin
 *               status:
 *                 type: string
 *                 example: active
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */

router.put('/:id',userController.updateUser);
/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Eliminar un usuario por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete('/:id', userController.deleteUser);
//metodo para eliminar delete
//metodo para actualizar put
//metodo para modificar patch

export default router;