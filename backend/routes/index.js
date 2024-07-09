const app = require('express');
const router = app.Router();


router.use('/users', require('./users'));
router.use('/students', require('./students'));
router.use('/auth', require('./auth'));
router.use('/kriteria', require('./kriteria'));

module.exports = router;

