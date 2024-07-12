const {Kriteria} = require('../../models')

module.exports = async (req, res) => {
    const data = await Kriteria.find().populate("sub_kriteria").sort({createdAt: 1})

    return res.json(200, {
        status: 'success',
        data
    });
}