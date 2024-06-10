/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for managing user accounts and authentication.
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     UserSignup:
 *       type: object
 *       required:
 *         - email
 *         - name
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: Email address of the user
 *           example: user@example.com
 *         name:
 *           type: string
 *           description: Name of the user
 *           example: John Doe
 *         password:
 *           type: string
 *           format: password
 *           description: User password
 *           example: password123
 *     UserSignin:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: Email address of the user
 *           example: user@example.com
 *         password:
 *           type: string
 *           format: password
 *           description: User password
 *           example: password123
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The user ID
 *           example: 64c8d958249fae54bae90bb9
 *         name:
 *           type: string
 *           description: Name of the user
 *           example: John Doe
 *         email:
 *           type: string
 *           format: email
 *           description: Email address of the user
 *           example: user@example.com
 *         avatar:
 *           type: string
 *           description: URL of the user's avatar
 *           example: http://example.com/avatar.jpg
 *         followers:
 *           type: array
 *           items:
 *             type: string
 *           description: List of follower user IDs
 *           example: []
 *         following:
 *           type: array
 *           items:
 *             type: string
 *           description: List of following user IDs
 *           example: []
 *     SelfUserDetails:
 *       type: object
 *       properties:
 *         avatar:
 *           type: string
 *           description: URL of the user's avatar image
 *           example: "http://res.cloudinary.com/dgbwicpza/image/upload/v1717873428/avatars/hlvodxck85k5zjyu0zds.jpg"
 *         name:
 *           type: string
 *           description: Name of the user
 *           example: "John Doe"
 *         email:
 *           type: string
 *           description: Email address of the user
 *           example: "user@example.com"
 *         createdRecipesCount:
 *           type: object
 *           properties:
 *             total:
 *               type: integer
 *               description: Total number of recipes created by the user
 *               example: 0
 *             data:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recipe'
 *           description: User's created recipes count
 *           example:
 *             total: 0
 *             data: []
 *         favoriteRecipesCount:
 *           type: object
 *           properties:
 *             total:
 *               type: integer
 *               description: Total number of recipes favorited by the user
 *               example: 0
 *             data:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recipe'
 *           description: User's favorite recipes count
 *           example:
 *             total: 0
 *             data: []
 *         followersCount:
 *           type: integer
 *           description: Total number of followers of the user
 *           example: 0
 *         followingCount:
 *           type: integer
 *           description: Total number of users the user is following
 *           example: 0
 *       description: User details for the authenticated user
 *     OtherUserDetails:
 *       type: object
 *       properties:
 *         avatar:
 *           type: string
 *           description: URL of the user's avatar image
 *           example: "https://s.gravatar.com/avatar/23463b99b62a72f26ed677cc556c44e8?s=250&r=pg&d=retro"
 *         name:
 *           type: string
 *           description: Name of the user
 *           example: "Vova"
 *         email:
 *           type: string
 *           description: Email address of the user
 *           example: "example@example.com"
 *         createdRecipesCount:
 *           type: object
 *           properties:
 *             total:
 *               type: integer
 *               description: Total number of recipes created by the user
 *               example: 0
 *             data:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recipe'
 *           description: User's created recipes count
 *           example:
 *             total: 0
 *             data: []
 *         followersCount:
 *           type: integer
 *           description: Total number of followers of the user
 *           example: 0
 *       description: User details for other users
 *     Recipe:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID of the recipe
 *           example: "6462a8f74c3d0ddd28897fd4"
 *         title:
 *           type: string
 *           description: Title of the recipe
 *           example: "Beef Brisket Pot Roast"
 *         category:
 *           type: string
 *           description: Category of the recipe
 *           example: "Beef"
 *         owner:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *               description: ID of the recipe owner
 *               example: "666492c597da40031e23fb48"
 *             name:
 *               type: string
 *               description: Name of the recipe owner
 *               example: "John Doe2"
 *             email:
 *               type: string
 *               description: Email of the recipe owner
 *               example: "user2@example.com"
 *         area:
 *           type: string
 *           description: Area of the cuisine the recipe belongs to
 *           example: "American"
 *         instructions:
 *           type: string
 *           description: Instructions to prepare the recipe
 *           example: "Prepare the brisket for cooking..."
 *         description:
 *           type: string
 *           description: Short description of the recipe
 *           example: "A comforting American dish..."
 *         thumb:
 *           type: string
 *           description: URL of the recipe thumbnail image
 *           example: "https://ftp.goit.study/img/so-yummy/preview/Beef%20Brisket%20Pot%20Roast.jpg"
 *         time:
 *           type: string
 *           description: Cooking time in minutes
 *           example: "300"
 *         ingredients:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID of the ingredient
 *                 example: "640c2dd963a319ea671e366c"
 *               measure:
 *                 type: string
 *                 description: Measurement of the ingredient
 *                 example: "4-5 pound"
 *         createdAt:
 *           type: string
 *           description: Date and time the recipe was created
 *           example: "2023-03-11T19:25:33.241Z"
 *         updatedAt:
 *           type: string
 *           description: Date and time the recipe was last updated
 *           example: "2023-10-18T09:18:18.842Z"
 *       description: Summary of a recipe
 */

/**
 * @swagger
 * /api/users/signup:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with email, name, and password.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserSignup'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       description: Access token for the registered user
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           description: id of the registered user
 *                         name:
 *                           type: string
 *                           description: Name of the registered user
 *                         avatarURL:
 *                           type: string
 *                           description: Link to avatar of the registered user
 *               example:
 *                 user:
 *                   token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
 *                   user:
 *                     id: 64c8d958249fae54bae90bb9
 *                     name: John Doe
 *                     avatarURL: "http://res.cloudinary.com/dgbwicpza/.../hlvodxck85k5zjyu0zds.jpg"
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: "Invalid request body"
 *       409:
 *         description: Email already in use
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: "Email already in use"
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
 * /api/users/signin:
 *   post:
 *     summary: Sign in to user account
 *     description: Sign in with email and password to obtain access token.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserSignin'
 *     responses:
 *       200:
 *         description: User signed in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Access token for the signed-in user
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: id of the registered user
 *                     name:
 *                       type: string
 *                       description: Name of the signed-in user
 *                     avatarURL:
 *                       type: string
 *                       description: Link to avatar of the registered user
 *               example:
 *                 token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
 *                 user:
 *                   id: 64c8d958249fae54bae90bb9
 *                   name: John Doe
 *                   avatarURL: "http://res.cloudinary.com/dgbwicpza/.../hlvodxck85k5zjyu0zds.jpg"
 *       401:
 *         description: Email or password invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: "Invalid email or password"
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
 * /api/users/current:
 *   get:
 *     summary: Get current user details
 *     description: Retrieve details of the currently authenticated user.
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Current user details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *               example:
 *                 name: John Doe
 *                 email: user@example.com
 *                 avatar: http://example.com/avatar.jpg
 *                 followers: []
 *                 following: []
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
 * /api/users/signout:
 *   post:
 *     summary: Sign out from user account
 *     description: Invalidate current user's authentication token to sign out.
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       204:
 *         description: User signed out successfully, no content to return
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
 * /api/users/avatars:
 *   patch:
 *     summary: Update user avatar
 *     description: Update the avatar image for the current user.
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: file
 *                 format: .jpg, .jpeg, .png, .gif, .bmp, .tiff
 *                 description: The avatar image file
 *                 example: "avatar.jpg"
 *     responses:
 *       200:
 *         description: Avatar updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 avatarURL:
 *                   type: string
 *                   format: uri
 *                   description: URL of the updated avatar
 *                   example: "http://res.cloudinary.com/dgbwicpza/image/upload/v1717873428/avatars/hlvodxck85k5zjyu0zds.jpg"
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
 * /api/users/followers:
 *   get:
 *     summary: Get user followers
 *     description: Retrieve the list of users following the current user.
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of user followers retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 followers:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *                   example: []
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
 * /api/users/following:
 *   get:
 *     summary: Get user followers
 *     description: Retrieve the list of users following the current user.
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of user followers retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 following:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *                   example: []
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
 * /api/users/follow/{userId}:
 *   post:
 *     summary: Follow a user
 *     description: Follow another user by their user ID.
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: ID of the user to follow
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User followed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: "User followed successfully"
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
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: "User not found"
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
 * /api/users/unfollow/{userId}:
 *   delete:
 *     summary: Unfollow a user
 *     description: Unfollow a user by their user ID.
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: ID of the user to unfollow
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User unfollowed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: "User unfollowed successfully"
 *       400:
 *         description: User is not being followed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: "User is not being followed"
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
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: "User not found"
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
 * /api/users/details/{userId}:
 *   get:
 *     summary: Get user details
 *     description: Retrieve details of a user by their user ID.
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/SelfUserDetails'
 *                 - $ref: '#/components/schemas/OtherUserDetails'
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
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: "User not found"
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
