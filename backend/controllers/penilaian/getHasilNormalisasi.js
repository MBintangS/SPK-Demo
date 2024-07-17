const { Penilaian, Kriteria, Student } = require('../../models');

module.exports = async (req, res) => {
  try {
    // Ambil semua data penilaian, kriteria, dan mahasiswa
    const penilaianData = await Penilaian.find({}).sort({ createdAt: 1 });
    const kriteriaData = await Kriteria.find({}).select('kode _id');
    const studentData = await Student.find({});

    // Buat Map untuk kriteria_id ke kriteria.name
    const kriteriaMap = kriteriaData.reduce((acc, kriteria) => {
      acc[kriteria._id.toString()] = `C${kriteria.kode}`;
      return acc;
    }, {});

    // Ambil nama-nama kriteria sebagai header kolom
    const kriteriaKodes = kriteriaData.map(kriteria => `C${kriteria.kode}`);

    // Kelompokkan penilaian berdasarkan student_id
    const groupedPenilaian = penilaianData.reduce((acc, item) => {
      const studentId = item.student_id.toString();
      if (!acc[studentId]) {
        acc[studentId] = [];
      }
      acc[studentId].push(item);
      return acc;
    }, {});

    // Fungsi untuk mengonversi indeks ke format A1, B2, dst.
    const getIndexLabel = (index) => {
      const letter = String.fromCharCode(65 + Math.floor(index / 26)); // A, B, C, ...
      const number = (index % 26) + 1; // 1, 2, 3, ...
      return `${letter}${number}`;
    };

    // Format data mahasiswa untuk tabel matriks
    const tableData = studentData.map((student, index) => {
      const studentPenilaian = groupedPenilaian[student._id.toString()] || [];
      const result = kriteriaKodes.reduce((acc, kriteriaKode) => {
        // Temukan penilaian untuk setiap kriteria
        const kriteriaId = Object.keys(kriteriaMap).find(id => kriteriaMap[id] === kriteriaKode);
        const penilaian = studentPenilaian.find(p => p.kriteria_id.toString() === kriteriaId);
        acc[kriteriaKode] = penilaian ? parseFloat(penilaian.normalization_score.toFixed(3)) : 0;
        return acc;
      }, {});

      return {
        index: getIndexLabel(index), // Menggunakan format A1, A2, dst.
        ...result
      };
    });

    // Format JSON untuk frontend
    const responseData = {
      columns: ['Alternatif', ...kriteriaKodes],
      rows: tableData.map(row => ({
        Alternatif: row.index,
        ...kriteriaKodes.reduce((acc, kriteriaKode) => {
          acc[kriteriaKode] = row[kriteriaKode];
          return acc;
        }, {})
      }))
    };

    return res.status(200).json({
      status: 'success',
      data: responseData
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};
