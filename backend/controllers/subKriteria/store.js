
const {SubKriteria} = require('../../models')
const fastestValidator = require('fastest-validator');
const validator = new fastestValidator();

module.exports = async (req, res) => {
    const schemaValidation = {
        name: 'string|empty:false',
        score: 'number|empty:false',
        kriteria_id:  'string|empty:false'
    }
    const validate = validator.validate(req.body, schemaValidation);

    if (validate.length) {
        return res.status(400).json({
            status: 'error',
            message: validate
        });
    }

    const created = await SubKriteria.create({
        name: req.body.name,
        score: req.body.score,
        kriteria_id: req.body.kriteria_id,
    }).then((data) => {
        return res.json(201, {
            status: 'success',
            data: {
                id: data.id
            }
        });
    }).catch(() => {
        return res.json(400, {
            status: 'error',
            message: 'error create subkriteria'
        });
    })
}