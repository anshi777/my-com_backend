/**
 * @swagger
 * tags:
 *   name: User
 *   description : User Management Api
 */

/**
 * @swagger
 * /api/v1/user:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: A list of users
 * 
* 
 * /api/v1/user/{id}:
 *   delete:
 *     summary: Delete user by User ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: User ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       400:
 *         description: User not found
 * 
 *   get:
 *     summary: Get User by User ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: User ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User fetch successfully
 *       400:
 *         description: User not found
 *   put:
 *     summary: Update User by User ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: User ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: User not found
 */
