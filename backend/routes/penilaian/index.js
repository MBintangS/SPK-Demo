const app = require('express');
const router = app.Router();
const {penilaian} = require('../../controllers')

router.get('/', penilaian.getPenilaian);
router.get('/hasil', penilaian.getHasilPenilaian);
router.get('/hasil-normalisasi', penilaian.getHasilNormalisasi);
router.get('/hasil-preferensi-qi', penilaian.getHasilPreferensiQi);
router.get('/hasil-akhir', penilaian.getHasilAkhir);
router.get('/hasil-akhir-download', penilaian.getHasilAkhirDownload);
router.post('/', penilaian.store);
router.get('/:id', penilaian.getPenilaianByStudentID);
router.put('/:id', penilaian.update);
router.delete('/', penilaian.destroy);

module.exports = router;