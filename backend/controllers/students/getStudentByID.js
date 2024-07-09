
const {Student} = require('../../models')

module.exports = async (req, res) => {
    await Student.findById(req.param('id')).select('nisn name').then((data) => {
        return res.json(200, {
            status: 'success',
            data
        });
    }).catch(() => {
        return res.status(404).json({
            status: 'error',
            message: 'Santri tidak ditemukan'
        });
    })
}