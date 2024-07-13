
const {SubKriteria} = require('../../models')

module.exports = async (req, res) => {
    await SubKriteria.findById(req.param('id')).select('name score kriteria_id').then((data) => {
        return res.json(200, {
            status: 'success',
            data
        });
    }).catch(() => {
        return res.status(404).json({
            status: 'error',
            message: 'sub kriteria tidak ditemukan'
        });
    })
}