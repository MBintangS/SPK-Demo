const { SubKriteria } = require('../../models');

module.exports = async (req, res) => {
  const { id } = req.params;

  try {
    // Temukan dan hapus SubKriteria berdasarkan ID
    const result = await SubKriteria.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({
        status: 'error',
        message: 'Sub Kriteria not found',
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Sub Kriteria deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};
