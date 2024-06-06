const app = require('express');
const router = app.Router();


router.use('/users', require('./users'));
router.use('/auth', require('./auth'));
// router.use('/users', userRoutes);

module.exports = router;

