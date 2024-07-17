const app = require('express');
const router = app.Router();
const {kriteria} = require('../../controllers')

router.get('/', kriteria.getKriterias);
router.get('/bobot', kriteria.getKriteriasBobot);
router.post('/', kriteria.store);
router.get('/:id', kriteria.getKriteriaByID);
router.put('/:id', kriteria.update);
router.delete('/:id', kriteria.destroy);

module.exports = router;