const {Kriteria} = require('../../models')

module.exports = async (req, res) => {
    try {
        const data = await Kriteria.find().populate("sub_kriteria").sort({ createdAt: 1 });

        // Extract the `kode` values for the columns and `normalizedBobot` values for the rows
        const tableData = {
            columns: data.map(kriteria => "C"+(kriteria.kode)+" "+(kriteria.type)),
            rows: data.map(kriteria => kriteria.normalizedBobot)
        };

        res.json(tableData);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};