const express = require('express');
const commentController = require("./../controllers/comment-controller");
const authController = require("./../controllers/auth-controller");
const multer = require("./../utils/multer")

const router = express.Router();


router.use(authController.isLogged);

router.post('/:id',multer.upload.any('images'),commentController.createComment);
router
    .route('/:id')
    .get(commentController.getAllComments)
    .patch(commentController.updateComment)
    .delete(commentController.deleteComment);

module.exports = router;