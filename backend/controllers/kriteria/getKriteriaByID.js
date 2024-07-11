const {Kriteria} = require('../../models')

module.exports = async (req, res) => {
    await Kriteria.findById(req.param('id')).select('kode name bobot type normalizedBobot').then((data) => {
        return res.json(200, {
            status: 'success',
            data
        });
    }).catch(() => {
        return res.status(404).json({
            status: 'error',
            message: 'Kriteria tidak ditemukan'
        });
    })
}