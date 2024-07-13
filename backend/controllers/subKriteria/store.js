
// const {SubKriteria} = require('../../models')
// const fastestValidator = require('fastest-validator');
// const validator = new fastestValidator();

// module.exports = async (req, res) => {
//     const schemaValidation = {
//         name: 'string|empty:false',
//         score: 'number|empty:false',
//         kriteria_id:  'string|empty:false'
//     }
//     const validate = validator.validate(req.body, schemaValidation);

//     if (validate.length) {
//         return res.status(400).json({
//             status: 'error',
//             message: validate
//         });
//     }

//     const created = await SubKriteria.create({
//         name: req.body.name,
//         score: req.body.score,
//         kriteria_id: req.body.kriteria_id,
//     }).then((data) => {
//         return res.json(201, {
//             status: 'success',
//             data: {
//                 id: data.id
//             }
//         });
//     }).catch(() => {
//         return res.json(400, {
//             status: 'error',
//             message: 'error create subkriteria'
//         });
//     })
// }

const { Kriteria, SubKriteria } = require('../../models');
const fastestValidator = require('fastest-validator');
const validator = new fastestValidator();

module.exports = async (req, res) => {
    const schemaValidation = {
        name: 'string|empty:false',
        score: 'number|empty:false',
        kriteria_id: 'string|empty:false'
    };
    
    // Validasi input
    const validate = validator.validate(req.body, schemaValidation);
    if (validate.length) {
        return res.status(400).json({
            status: 'error',
            message: validate
        });
    }

    const { kriteria_id, name, score } = req.body;

    try {
        // Buat dan simpan sub kriteria baru
        const newSubKriteria = await SubKriteria.create({ name, score, kriteria_id });

        // Temukan kriteria dan tambahkan sub kriteria ke kriteria
        const kriteria = await Kriteria.findById(kriteria_id);
        if (!kriteria) {
            throw new Error("Kriteria tidak ditemukan");
        }

        // Tambahkan sub kriteria ke kriteria
        kriteria.sub_kriteria.push(newSubKriteria._id);
        await Kriteria.updateOne({ _id: kriteria_id }, { sub_kriteria: kriteria.sub_kriteria });

        console.log("Sub kriteria berhasil ditambahkan ke kriteria");

        return res.status(201).json({
            status: 'success',
            message: 'Sub kriteria berhasil ditambahkan',
            data: {
                id: newSubKriteria._id
            }
        });
    } catch (error) {
        console.error("Error menambahkan sub kriteria ke kriteria:", error);
        return res.status(500).json({
            status: 'error',
            message: 'Error create subkriteria',
            error: error.message
        });
    }
};
