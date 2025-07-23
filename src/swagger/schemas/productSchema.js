/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - description
 *         - img
 *       properties:
 *         name:
 *           type: string
 *           example: mobile phone
 *         price:
 *           type: number
 *           example: 25999
 *         description:
 *           type: string
 *           example: this is a brand new iphone
 *         img:
 *           type: string
 *           example: productImg.jpg
 *         category:
 *           type: string
 *           example: electronics
 *         review:
 *           type: string
 *           example: it's a great phone
 *         createdBy:
 *           type: string
 *           example: apple
 *         rating:
 *           type: number
 *           example: 4.6
 *         brand:
 *           type: string
 *           example: apple
 *         inStock:
 *           type: boolean
 *           example: true
 *         discount:
 *           type: number
 *           example: 20
 *         color:
 *           type: string
 *           example: red
 *         badge:
 *           type: string
 *           example: best seller
 *         sizes:
 *           type: array
 *           items:
 *             type: string
 *           example: ["6.7\"", "6.1\""]
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           example: ["#trending", "#hot"]
 *         isFeatured:
 *           type: boolean
 *           example: true
 *         isArchived:
 *           type: boolean
 *           example: false
 *         totalSold:
 *           type: number
 *           example: 110000
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00.000Z"
 */
