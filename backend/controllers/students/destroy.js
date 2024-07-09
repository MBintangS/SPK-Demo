
const {Student} = require('../../models')

module.exports = async (req, res) => {
    await Student.findById(req.param('id')).then(async (data) => {
        await data.deleteOne().then(() => {
            return res.status(200).json({
                status: 'error',
                message: 'Santri berhasil dihapus'
            });
        }).catch(({message}) => {
            return res.status(500).json({
                status: 'error',
                message: 'Santri gagal dihapus',
                error: message
            });
        })
    }).catch(({message}) => {
        return res.status(404).json({
            status: 'error',
            message: 'Santri tidak ditemukan',
            error: message
        });
    })
}