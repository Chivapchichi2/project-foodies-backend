/**
 * @swagger
 * /api/recipes:
 *   get:
 *     summary: Get recipes by filter
 *     description: Retrieve a list of recipes based on specific filters with pagination.
 *     tags: [Recipes]
 *     parameters:
 *       - name: category
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *         description: Filter recipes by category
 *       - name: ingredients
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *         description: Filter recipes by ingredients
 *       - name: area
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *         description: Filter recipes by area
 *       - name: page
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - name: limit
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           default: 12
 *         description: Number of recipes per page
 *     responses:
 *       200:
 *         description: A list of recipes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   example: 285
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *                 totalPages:
 *                   type: integer
 *                   example: 24
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "6462a8f74c3d0ddd288980d4"
 *                       title:
 *                         type: string
 *                         example: "Borscht"
 *                       category:
 *                         type: string
 *                         example: "Soup"
 *                       area:
 *                         type: string
 *                         example: "Ukrainian"
 *                       instructions:
 *                         type: string
 *                         example: "Preheat the oven to 200C..."
 *                       description:
 *                         type: string
 *                         example: "It’s no secret that almost every family has its own special borscht recipe..."
 *                       thumb:
 *                         type: string
 *                         example: "https://ftp.goit.study/img/so-yummy/preview/Borscht.jpg"
 *                       time:
 *                         type: string
 *                         example: "90"
 *                       owner:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: "64c8d958249fae54bae90bb9"
 *                           name:
 *                             type: string
 *                             example: "GoIT"
 *                           avatar:
 *                             type: string
 *                             example: null
 *                           email:
 *                             type: string
 *                             example: "goit@gmail.com"
 *                       ingredients:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             ingredient:
 *                               type: object
 *                               properties:
 *                                 _id:
 *                                   type: string
 *                                   example: "640c2dd963a319ea671e367e"
 *                                 name:
 *                                   type: string
 *                                   example: "Butter"
 *                                 desc:
 *                                   type: string
 *                                   example: "A dairy product made from churning cream or milk, with a high fat content and a creamy, rich flavor that is often used in cooking and baking."
 *                                 img:
 *                                   type: string
 *                                   example: "https://ftp.goit.study/img/so-yummy/ingredients/640c2dd963a319ea671e367e.png"
 *                             measure:
 *                               type: string
 *                               example: "175g"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: "Internal server error"
 */

/**
 * @swagger
 * /api/recipes:
 *   post:
 *     summary: Add a new recipe
 *     description: Create a new recipe.
 *     tags: [Recipes]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               thumb:
 *                 type: file
 *                 format: .jpg, .jpeg, .png, .gif, .bmp, .tiff
 *                 description: The dishes image file
 *                 example: "dishes.jpg"
 *               title:
 *                 type: string
 *                 default: Potatoes with meat
 *                 description: Recipe title
 *               area:
 *                 type: string
 *                 default: Ukrainian
 *                 description: Recipe area
 *               instructions:
 *                 type: string
 *                 default: Preheat the oven to 200C...
 *                 description: Recipe instructions
 *               description:
 *                 type: string
 *                 default: Delicious dish with potatoes and meat
 *                 description: Recipe description
 *               time:
 *                 type: string
 *                 default: 60
 *                 description: Cooking time in minutes
 *               category:
 *                 type: string
 *                 default: Beef
 *                 description: Recipe category
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       default: 640c2dd963a319ea671e37aa
 *                       description: Ingredient ID
 *                     measure:
 *                       type: string
 *                       default: 175g
 *                       description: Measurement amount
 *     responses:
 *       201:
 *         description: Recipe created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
 *       400:
 *         description: Bad Request, no file uploaded
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: "No file uploaded"
 *       401:
 *         description: Unauthorized, authentication token is missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: "Authorization header not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: "Internal server error"
 */

/**
 * @swagger
 * /api/recipes/myrecipes:
 *   get:
 *     summary: Get user's recipes
 *     description: Retrieve a list of recipes created by the authenticated user.
 *     tags: [Recipes]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of user's recipes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recipe'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/recipes/myrecipes/favorites:
 *   get:
 *     summary: Get user's favorite recipes
 *     description: Retrieve a list of favorite recipes of the authenticated user.
 *     tags: [Recipes]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of user's favorite recipes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recipe'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/recipes/favorites:
 *   post:
 *     summary: Add a favorite recipe
 *     description: Add a recipe to the authenticated user's favorites.
 *     tags: [Recipes]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FavoriteRecipe'
 *     responses:
 *       200:
 *         description: Recipe added to favorites
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/recipes/favorites:
 *   delete:
 *     summary: Remove a favorite recipe
 *     description: Remove a recipe from the authenticated user's favorites.
 *     tags: [Recipes]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FavoriteRecipe'
 *     responses:
 *       200:
 *         description: Recipe removed from favorites
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/recipes/favorites:
 *   get:
 *     summary: Get all favorite recipes
 *     description: Retrieve a list of all favorite recipes.
 *     tags: [Recipes]
 *     responses:
 *       200:
 *         description: A list of favorite recipes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recipe'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/recipes/{id}:
 *   get:
 *     summary: Get a single recipe
 *     description: Retrieve details of a single recipe by its ID.
 *     tags: [Recipes]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the recipe
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single recipe
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
 *       404:
 *         description: Recipe not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/recipes/{id}:
 *   delete:
 *     summary: Delete a recipe
 *     description: Remove a recipe by its ID.
 *     tags: [Recipes]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the recipe
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Recipe deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Recipe not found
 *       500:
 *         description: Internal server error
 */
