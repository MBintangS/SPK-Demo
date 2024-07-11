const { Kriteria } = require('../../models');
const fastestValidator = require('fastest-validator');
const validator = new fastestValidator();

module.exports = async (req, res) => {
    const schemaValidation = {
        bobot: 'number|empty:false',
        type: 'string|empty:false',
        name: 'string|empty:false',
    };
    const validate = validator.validate(req.body, schemaValidation);

    if (validate.length) {
        return res.status(400).json({
            status: 'error',
            message: validate
        });
    }

    let normalizedBobot = 0;
    let latestKode = 0;

    const allKriteria = await Kriteria.find({}).select('bobot kode');

    let totalBobot = req.body.bobot;
    allKriteria.forEach((item) => {
        totalBobot += item.bobot;
    });

    normalizedBobot = req.body.bobot / totalBobot;

    await Promise.all(
        allKriteria.map(async (item) => {
            const currentNormalizedBobot = item.bobot / totalBobot;
            await item.updateOne({
                normalizedBobot: currentNormalizedBobot
            }).catch(({ message }) => {
                return res.status(500).json({
                    status: 'error',
                    message: 'Kriteria gagal diupdate',
                    error: message
                });
            });
        })
    );

    if (allKriteria.length > 0) {
        latestKode = Math.max(...allKriteria.map(k => k.kode));
    }

    const created = await Kriteria.create({
        kode: latestKode + 1,
        name: req.body.name,
        type: req.body.type,
        bobot: req.body.bobot,
        normalizedBobot
    });

    if (created && created.id) {
        return res.status(201).json({
            status: 'success',
            data: {
                id: created.id
            }
        });
    } else {
        return res.status(400).json({
            status: 'error',
            message: 'error create'
        });
    }
};
