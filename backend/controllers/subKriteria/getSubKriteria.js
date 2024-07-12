const { SubKriteria, Kriteria } = require('../../models');

module.exports = async (req, res) => {
  try {
    const subKriteriaData = await SubKriteria.find({}).populate("kriteria_id").sort({ createdAt: 1 });
    const kriteriaData = await Kriteria.find({});

    const groupedSubKriteria = subKriteriaData.reduce((acc, item) => {
      const kriteriaId = item.kriteria_id._id.toString();
      if (!acc[kriteriaId]) {
        acc[kriteriaId] = [];
      }
      acc[kriteriaId].push(item);
      return acc;
    }, {});

    const combinedData = kriteriaData.map(kriteria => {
      return {
        ...kriteria.toObject(),
        sub_kriteria: groupedSubKriteria[kriteria._id.toString()] || []
      };
    });

    return res.status(200).json({
      status: 'success',
      data: combinedData
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};
