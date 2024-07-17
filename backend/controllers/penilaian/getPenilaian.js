const { Penilaian, Student } = require('../../models');

module.exports = async (req, res) => {
  try {
    const penilaianData = await Penilaian.find({}).sort({ createdAt: 1 });
    const studentData = await Student.find({});

    const groupedPenilaian = penilaianData.reduce((acc, item) => {
      const studentId = item.student_id._id.toString();
      if (!acc[studentId]) {
        acc[studentId] = [];
      }
      acc[studentId].push(item);
      return acc;
    }, {});

    const combinedData = studentData.map(student => {
      return {
        ...student.toObject(),
        penilaian: groupedPenilaian[student._id.toString()] || []
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

// --------------------------------------------------------
// const { Penilaian, Kriteria, Student } = require('../../models');

// module.exports = async (req, res) => {
//   try {
//     // Fetch all penilaian and kriteria data
//     const penilaianData = await Penilaian.find({}).sort({ createdAt: 1 });
//     const kriteriaData = await Kriteria.find({}).select('name _id');
//     const studentData = await Student.find({});

//     // Create a mapping from kriteria_id to kriteria code
//     const kriteriaMap = kriteriaData.reduce((acc, kriteria) => {
//       acc[kriteria._id.toString()] = kriteria.name;
//       return acc;
//     }, {});

//     // Group penilaian data by student_id
//     const groupedPenilaian = penilaianData.reduce((acc, item) => {
//       const studentId = item.student_id.toString();
//       if (!acc[studentId]) {
//         acc[studentId] = [];
//       }
//       acc[studentId].push(item);
//       return acc;
//     }, {});

//     // Combine student data with their penilaian scores
//     const combinedData = studentData.map(student => {
//       const studentPenilaian = groupedPenilaian[student._id.toString()] || [];
//       const result = studentPenilaian.reduce((acc, penilaian) => {
//         const kriteriaCode = kriteriaMap[penilaian.kriteria_id.toString()];
//         if (kriteriaCode) {
//           acc[kriteriaCode] = penilaian.normalization_score;
//         }
//         return acc;
//       }, {});

//       return {
//         ...student.toObject(),
//         penilaian: result
//       };
//     });

//     return res.status(200).json({
//       status: 'success',
//       data: combinedData
//     });
//   } catch (error) {
//     return res.status(500).json({
//       status: 'error',
//       message: error.message
//     });
//   }
// };
