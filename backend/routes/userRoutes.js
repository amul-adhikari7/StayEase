const router = require('express').Router()
const userController = require('../controller/userController')
const { authGuard } = require('../middleware/authGuard')

router.post('/register', userController.register)
router.post('/login', userController.login)
//api url for user to get their profile
router.get('/profile', authGuard, userController.getUserProfile)
//update user profile
router.put('/profile/edit', authGuard, userController.updateUserProfile)
//verify accont
router.post('/profile/verify', authGuard, userController.verifyAccount)
//forgot password
router.post('/forgot-password', userController.forgotPassword)
//reset password
router.post('/reset-password', userController.resetPassword)

router.delete('/profile/delete', authGuard, userController.deleteUserProfile)

module.exports = router
