var express = require('express');
var router = express.Router();
const { userRegister, userLogin, userUpdate, userDelete, userGetAll } = require('../controller/userController');
//const { userCloudinary } = require('../controller/cloudinaryController');

/* post users register. */
// router.post('/register', userRegister);
router.route('/register').post(userRegister);

// get all users
router.route('/getall').get(userGetAll);

/* post users login. */
router.route('/login').post(userLogin);

/* put user update */
router.route('/update/:id').put(userUpdate);

/* delete user delete */
router.route('/delete/:id').delete(userDelete);

/*cloudinary*/
//router.route('/register').post(userCloudinary);

module.exports = router;
