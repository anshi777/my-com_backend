/**
 * @swagger
 * tags:
 *   name: Product
 *   description : Product CRUD Api
 */

/**
 * @swagger
 * /api/v1/product:
 *   post:
 *     summary: this is product creation api
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Product create successful
 *       400:
 *        description: Validation error

 *   get:
 *     summary: Get all products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: A list of categories
 * 
* 
 * /api/v1/product/{id}:
 *   delete:
 *     summary: Delete product by product ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Product ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       400:
 *         description: Product not found
 * 
 *   get:
 *     summary: Get product by product ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Product ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product fetch successfully
 *       400:
 *         description: Product not found
 *   put:
 *     summary: Update product by product ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Product ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Product not found
 */
