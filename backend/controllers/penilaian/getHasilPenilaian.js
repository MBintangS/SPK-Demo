// --------------------------------------------------------
const { Penilaian, Kriteria, Student } = require('../../models');

module.exports = async (req, res) => {
  try {

    const penilaianData = await Penilaian.find({}).sort({ createdAt: 1 });
    const kriteriaData = await Kriteria.find({}).select('name _id');
    const studentData = await Student.find({});

    // Buat Map untuk kriteria_id ke kriteria.name
    const kriteriaMap = kriteriaData.reduce((acc, kriteria) => {
      acc[kriteria._id.toString()] = kriteria.name;
      return acc;
    }, {});

    // grup penilaian dengan student id
    const groupedPenilaian = penilaianData.reduce((acc, item) => {
      const studentId = item.student_id.toString();
      if (!acc[studentId]) {
        acc[studentId] = [];
      }
      acc[studentId].push(item);
      return acc;
    }, {});

    // gabung student dengan score penilaian normalization_score
    const combinedData = studentData.map(student => {
      const studentPenilaian = groupedPenilaian[student._id.toString()] || [];
      const result = studentPenilaian.reduce((acc, penilaian) => {
        const kriteriaCode = kriteriaMap[penilaian.kriteria_id.toString()];
        if (kriteriaCode) {
          acc[kriteriaCode] = penilaian.normalization_score;
        }
        return acc;
      }, {});

      return {
        ...student.toObject(),
        penilaian: result
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
