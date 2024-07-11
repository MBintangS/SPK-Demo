const { Kriteria } = require('../../models');

module.exports = async (req, res) => {
    const { id } = req.params;

    // Temukan dan hapus kriteria berdasarkan ID
    const kriteriaToDelete = await Kriteria.findByIdAndDelete(id);

    if (!kriteriaToDelete) {
        return res.status(404).json({
            status: 'error',
            message: 'Kriteria tidak ditemukan'
        });
    }

    // Ambil semua kriteria yang tersisa
    const remainingKriteria = await Kriteria.find({}).select('bobot');

    // Hitung ulang total bobot dan normalizedBobot untuk kriteria yang tersisa
    let totalBobot = 0;
    remainingKriteria.forEach((item) => {
        totalBobot += item.bobot;
    });

    await Promise.all(
        remainingKriteria.map(async (item, index) => {
            const normalizedBobot = item.bobot / totalBobot;
            await item.updateOne({
                normalizedBobot,
                kode: index + 1
            }).catch(({ message }) => {
                return res.status(500).json({
                    status: 'error',
                    message: 'Kriteria gagal diupdate setelah penghapusan',
                    error: message
                });
            });
        })
    );

    return res.json({
        status: 'success',
        message: 'Kriteria berhasil dihapus'
    });
};
