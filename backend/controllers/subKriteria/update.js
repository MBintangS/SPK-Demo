const { SubKriteria } = require('../../models');
const fastestValidator = require('fastest-validator');
const validator = new fastestValidator();

module.exports = async (req, res) => {
  const { id } = req.params;

  // Schema untuk validasi input
  const schemaValidation = {
    name: 'string|empty:false',
    score: 'number|empty:false',
    kriteria_id: 'string|optional',
  };

  const validate = validator.validate(req.body, schemaValidation);

  if (validate.length) {
    return res.status(400).json({
      status: 'error',
      message: validate,
    });
  }

  try {
    const updated = await SubKriteria.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({
        status: 'error',
        message: 'Sub Kriteria tidak ditemukan',
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Sub Kriteria berhasil di update',
      data: updated,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};
