/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         _id:
 *           type: string
 *           description: Unique identifier for the user
 *           example: 60b6c0f8d2a3e00f88b8e94d
 *         name:
 *           type: string
 *           description: User's full name
 *           example: John Doe
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address (unique)
 *           example: johndoe@example.com
 *         password:
 *           type: string
 *           description: Hashed password (not returned in responses generally)
 *           example: "$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36FmWj9xG2vO0yxXlH6KlG."
 *         role:
 *           type: string
 *           enum:
 *             - user
 *             - admin
 *           description: Role of the user
 *           example: user
 *         wishlist:
 *           type: array
 *           description: List of product IDs in the user's wishlist
 *           items:
 *             type: string
 *             example: 60b6c0f8d2a3e00f88b8e94e
 *         cart:
 *           type: array
 *           description: User's shopping cart items
 *           items:
 *             type: object
 *             properties:
 *               product:
 *                 type: string
 *                 description: Product ID
 *                 example: 60b6c0f8d2a3e00f88b8e94f
 *               quantity:
 *                 type: integer
 *                 description: Quantity of the product in cart
 *                 example: 2
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the user was created
 *           example: 2023-01-01T00:00:00.000Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the user was last updated
 *           example: 2023-01-02T00:00:00.000Z
 */

