const app = require('express');
const router = app.Router();

const {auth} = require('../../controllers')

router.post('/login', auth.login);

module.exports = router;