const app = require('express');
const router = app.Router();

const {user} = require('../../controllers')

router.get('/', user.getUsers);

module.exports = router;