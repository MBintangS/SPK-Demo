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
    const { id } = req.params;

    // Update Kriteria dengan ID yang diberikan
    await Kriteria.findById(id).then(async (kriteria) => {
        if (!kriteria) {
            return res.status(404).json({
                status: 'error',
                message: 'Kriteria tidak ditemukan'
            });
        }

        // Menghitung total bobot baru setelah update
        let totalBobot = req.body.bobot;
        const allKriteria = await Kriteria.find({}).select('bobot');

        allKriteria.forEach((item) => {
            if (item._id.toString() !== id) {
                totalBobot += item.bobot;
            }
        });

        normalizedBobot = req.body.bobot / totalBobot;

        // Update normalizedBobot untuk semua kriteria
        await Promise.all(
            allKriteria.map(async (item, index) => {
                const currentNormalizedBobot = item.bobot / totalBobot;
                await item.updateOne({
                    normalizedBobot: currentNormalizedBobot,
                    kode: index + 1
                }).catch(({ message }) => {
                    return res.status(500).json({
                        status: 'error',
                        message: 'Kriteria gagal diupdate',
                        error: message
                    });
                });
            })
        );

        // Update kriteria dengan ID yang diberikan
        kriteria.name = req.body.name;
        kriteria.type = req.body.type;
        kriteria.bobot = req.body.bobot;
        kriteria.normalizedBobot = normalizedBobot;

        await kriteria.save();

        return res.json({
            status: 'success',
            data: {
                id: kriteria._id
            }
        });
    }).catch(({ message }) => {
        return res.status(500).json({
            status: 'error',
            message: 'Kriteria gagal ditemukan',
            error: message
        });
    });
};
