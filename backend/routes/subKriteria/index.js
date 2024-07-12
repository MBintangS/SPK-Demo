const app = require('express');
const router = app.Router();
const {subKriteria} = require('../../controllers')

router.get('/', subKriteria.getSubKriteria);
router.get('/kriteria/:id', subKriteria.getSubKriteriaByKriteriaID);
router.get('/:id', subKriteria.getSubKriteriaByID);
router.post('/', subKriteria.store);
router.put('/:id', subKriteria.update);
router.delete('/:id', subKriteria.destroy);

module.exports = router;