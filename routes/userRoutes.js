const express = require('express');
const router = express.Router();

const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication');

const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require('../controllers/userController');

router
  .route('/')
  .get(
    authenticateUser,
    authorizePermissions('admin', 'premiumUser'),
    getAllUsers
  );

router.route('/showMe').get(authenticateUser, showCurrentUser);
router.route('/updateUser').patch(authenticateUser, updateUser);
router.route('/updateUserPassword').patch(authenticateUser, updateUserPassword);

// when using id, the route needs to be below all other /* routes
router.route('/:id').get(authenticateUser, getSingleUser);

module.exports = router;
