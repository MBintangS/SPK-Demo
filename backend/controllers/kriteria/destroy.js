const { Kriteria, SubKriteria } = require('../../models');

module.exports = async (req, res) => {
    const { id } = req.params;

    try {
        // Temukan kriteria berdasarkan ID
        const kriteriaToDelete = await Kriteria.findById(id);

        if (!kriteriaToDelete) {
            return res.status(404).json({
                status: 'error',
                message: 'Kriteria tidak ditemukan'
            });
        }

        console.log('sub_kriteria to delete:', kriteriaToDelete);

        // Hapus sub_kriteria yang terkait
        if (kriteriaToDelete.sub_kriteria && kriteriaToDelete.sub_kriteria.length > 0) {
            const result = await SubKriteria.deleteMany({ _id: { $in: kriteriaToDelete.sub_kriteria } });
            console.log('SubKriteria delete result:', result);
        }

        // Hapus kriteria
        await Kriteria.findByIdAndDelete(id);

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
                }).catch(() => {
                    throw new Error('Kriteria gagal diupdate setelah penghapusan');
                });
            })
        );

        return res.json({
            status: 'success',
            message: 'Kriteria dan sub_kriteria terkait berhasil dihapus'
        });
    } catch (error) {
        console.error('Error during deletion:', error);
        return res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};
