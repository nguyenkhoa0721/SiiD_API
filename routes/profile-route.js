const express = require('express');
const profileController = require("./../controllers/profile-controller");
const authController = require("./../controllers/auth-controller");
const multer = require("./../utils/multer")

const router = express.Router();

router
    .route('/:id')
    .get(profileController.getProfile)
    .patch(
        authController.isLogged,
        profileController.updateProfile
    )
    .post(
        authController.isLogged,
        profileController.preUpdateAvatar,
        multer.upload.single('avatar'),
        profileController.updateAvatar
    )

    //delete tinh sau neu co khoa tai khoan
module.exports = router;