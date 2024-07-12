
const {Student} = require('../../models')
const fastestValidator = require('fastest-validator');
const validator = new fastestValidator();

module.exports = async (req, res) => {
    const schemaValidation = {
        nisn: 'string|empty:false',
        name: 'string|empty:false',
    }
    const validate = validator.validate(req.body, schemaValidation);

    if (validate.length) {
        return res.status(400).json({
            status: 'error',
            message: validate
        });
    }
    await Student.findById(req.param('id')).then(async (data) => {
        await data.updateOne({
            nisn: req.body.nisn,
            name: req.body.name,
        }).then(() => {
            return res.status(200).json({
                status: 'success',
                message: 'Santri berhasil diupdate'
            });
        }).catch(({message}) => {
            return res.status(500).json({
                status: 'error',
                message: 'Santri gagal diupdate',
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