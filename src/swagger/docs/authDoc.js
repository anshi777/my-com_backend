/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User Authentication APIs
 */


/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthRegister'
 *     responses:
 *       201:
 *         description: Registration successful
 *       400:
 *         description: Validation error

 * /api/v1/auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthLogin'
 *     responses:
 *       200:
 *         description: Login successful, returns tokens
 *       401:
 *         description: Invalid credentials

 * /api/v1/auth/logout:
 *   post:
 *     summary: Log out the user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/isAuth'
 *     responses:
 *       200:
 *         description: Logout success

 * /api/v1/auth/otp:
 *   post:
 *     summary: Send OTP to email
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/isAuth'
 *     responses:
 *       200:
 *         description: OTP sent successfully

 * /api/v1/auth/resendOtp:
 *   post:
 *     summary: Verify OTP
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/isAuth'
 *     responses:
 *       200:
 *         description: Verification successful
 *       404:
 *         description: Invalid or expired code
 */



