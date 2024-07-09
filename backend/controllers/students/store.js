
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
    const alreadyExist = await Student.findOne({ nisn: req.body.nisn });

    if (alreadyExist) {
        return res.status(400).json({
            status: 'error',
            message: 'NISN already exist'
        });
    }

    const created = await Student.create({
        name: req.body.name,
        nisn: req.body.nisn,
    });

    if (created && created.id) {
        return res.json(201, {
            status: 'success',
            data: {
                id: created.id
            }
        });
    } else {
        return res.json(400, {
            status: 'error',
            message: 'error create student'
        });
    }
}