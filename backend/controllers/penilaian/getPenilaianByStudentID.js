const { Penilaian, Kriteria, Student } = require('../../models');

module.exports = async (req, res) => {
  try {
    const { id } = req.params; // Ambil student_id dari parameter request

    console.log("student_ID: ", id);

    if (!id) {
      return res.status(400).json({
        status: 'error',
        message: 'Student ID is required'
      });
    }

    // Fetch the penilaian data for the specific student_id
    const penilaianData = await Penilaian.find({ student_id: id }).sort({ createdAt: 1 });
    console.log("Penilaian Data: ", penilaianData); // Tambahkan logging

    const kriteriaData = await Kriteria.find({}).select('name _id');

    // Create a mapping from kriteria_id to kriteria code
    const kriteriaMap = kriteriaData.reduce((acc, kriteria) => {
      acc[kriteria._id.toString()] = kriteria.name;
      return acc;
    }, {});

    // Fetch student data for the specific student_id
    const studentData = await Student.findById(id);

    if (!studentData) {
      return res.status(404).json({
        status: 'error',
        message: 'Student not found'
      });
    }

    // Map penilaian data to kriteria codes
    const result = penilaianData.reduce((acc, penilaian) => {
      const kriteriaCode = kriteriaMap[penilaian.kriteria_id.toString()];
      if (kriteriaCode) {
        acc[kriteriaCode] = penilaian.normalization_score;
      }
      return acc;
    }, {});

    // Combine student data with their penilaian scores
    const combinedData = {
      ...studentData.toObject(),
      penilaian: result
    };

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
