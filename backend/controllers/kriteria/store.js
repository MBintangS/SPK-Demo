
const {Kriteria} = require('../../models')
const fastestValidator = require('fastest-validator');
const validator = new fastestValidator();

module.exports = async (req, res) => {
    const schemaValidation = {
        bobot: 'number|empty:false',
        type: 'string|empty:false',
        name: 'string|empty:false',
    }
    const validate = validator.validate(req.body, schemaValidation);

    if (validate.length) {
        return res.status(400).json({
            status: 'error',
            message: validate
        });
    }

    let normalizedBobot = 0;
    let latestKode = 0;

    await Kriteria.find({}).select('bobot').then((data) => {
        let totalBobot = req.body.bobot;
        data.map((item) => {
            totalBobot += item.bobot
        })
        normalizedBobot = req.body.bobot / totalBobot
        data.map(async (item, index) => {
            latestKode = index
            const currentNormalizedBobot = item.bobot / totalBobot;
            await item.updateOne({
                normalizedBobot: currentNormalizedBobot,
                kode: index + 1
            }).catch(({message}) => {
                return res.status(500).json({
                    status: 'error',
                    message: 'Santri gagal diupdate',
                    error: message
                });
            })
            totalBobot += item.bobot

        })
    })
    
    const created = await Kriteria.create({
        kode: latestKode + 2,
        name: req.body.name,
        type: req.body.type,
        bobot: req.body.bobot,
        normalizedBobot
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
            message: 'error create'
        });
    }
}