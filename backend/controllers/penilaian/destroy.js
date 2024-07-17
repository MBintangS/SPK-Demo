const { Penilaian } = require('../../models');

module.exports = async (req, res) => {
  try {
    // Delete all documents in the Penilaian collection
    const result = await Penilaian.deleteMany();

    // Check if any documents were deleted
    if (result.deletedCount === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Tidak ada Penilaian untuk dihapus',
      });
    }

    // Return a success response
    return res.status(200).json({
      status: 'success',
      message: 'Semua penilaian berhasil dihapus',
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    // Return an error response if something goes wrong
    return res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};
