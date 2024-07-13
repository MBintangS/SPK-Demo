const app = require('express');
const router = app.Router();
const {penilaian} = require('../../controllers')

router.get('/', penilaian.getPenilaian);
router.get('/hasil', penilaian.getHasilPenilaian);
router.get('/:id', penilaian.getPenilaianByStudentID);
router.post('/', penilaian.store);
// router.put('/:id', kriteria.update);
// router.delete('/:id', kriteria.destroy);

module.exports = router;