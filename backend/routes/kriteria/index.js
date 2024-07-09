const app = require('express');
const router = app.Router();
const {kriteria} = require('../../controllers')

// router.get('/', kriteria.getKriteria);
// router.get('/:id', kriteria.getKriteriaByID);
router.post('/', kriteria.store);
// router.put('/:id', kriteria.update);
// router.delete('/:id', kriteria.destroy);

module.exports = router;