/**
 * @swagger
 * components:
 *   schemas:
 *     Auth:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         _id:
 *           type: string
 *           format: uuid
 *           example: "60c72b2f5f1b2c001c8e4c2b"
 *         name:
 *           type: string
 *           example: John Doe
 *         email:
 *           type: string
 *           format: email
 *           example: johndoe@example.com
 *         password:
 *           type: string
 *           format: password
 *           example: strongpassword123
 *         img:
 *           type: string
 *           format: uri
 *           example: https://example.com/profile.jpg
 *         coverImg:
 *           type: string
 *           format: uri
 *           example: https://example.com/cover.jpg
 *         role:
 *           type: string
 *           enum: [user, seller, admin]
 *           example: user
 *         wishlist:
 *           type: array
 *           items:
 *             type: string
 *             format: uuid
 *             example: "60c72b2f5f1b2c001c8e4c2c"
 *         cart:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               product:
 *                 type: string
 *                 format: uuid
 *                 example: "60c72b2f5f1b2c001c8e4c2d"
 *               quantity:
 *                 type: integer
 *                 default: 1
 *                 example: 2
 *         isAuth:
 *           type: boolean
 *           default: false
 *           example: true
 *         verificationCode:
 *           type: string
 *           example: "123456"
 *         refreshToken:
 *           type: string
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00.000Z"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AuthRegister:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           example: John Doe
 *         email:
 *           type: string
 *           format: email
 *           example: johndoe@example.com
 *         password:
 *           type: string
 *           format: password
 *           example: strongpassword123
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AuthLogin:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: johndoe@example.com
 *         password:
 *           type: string
 *           format: password
 *           example: strongpassword123
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     isAuth:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: johndoe@example.com
 */