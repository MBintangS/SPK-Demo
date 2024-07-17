const { Penilaian, Kriteria, Student } = require('../../models');

module.exports = async (req, res) => {
  try {
    // Ambil semua data penilaian, kriteria, dan mahasiswa
    const penilaianData = await Penilaian.find({}).sort({ createdAt: 1 });
    const kriteriaData = await Kriteria.find({}).select('_id kode normalizedBobot');
    const studentData = await Student.find({});

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
    let tableData = studentData.map((student, index) => {
      const studentPenilaian = groupedPenilaian[student.id] || [];
      let x = 0;
      let y = 0;
      let qi = 0;
      if (studentPenilaian.length) {  
        studentPenilaian.map((nilai, index) => {
          const kriteria = kriteriaData.find(kriteria => kriteria.id === nilai.kriteria_id.toString());
          x += parseFloat(parseFloat(nilai.normalization_score) * parseFloat(kriteria.normalizedBobot)); 
          if (y == 0) {
            y = parseFloat(Math.pow(parseFloat(nilai.normalization_score), parseFloat(kriteria.normalizedBobot))); 
          } else {
            y *= parseFloat(Math.pow(parseFloat(nilai.normalization_score), parseFloat(kriteria.normalizedBobot))); 
          }
        })
        qi = parseFloat((( 0.5 * x ) + ( 0.5 * y )).toFixed(3))
      }

      return {
        index: getIndexLabel(index), // Menggunakan format A1, A2, dst.
        name: student.name,
        qi
      };
    });

    // Urutkan data berdasarkan nilai qi dari terbesar ke terkecil
    tableData = tableData.sort((a, b) => b.qi - a.qi);

    // Format JSON untuk frontend 
    const responseData = {
      sheet: "Hasil SPK WASPAS",
      columns: [
        { label: "Alternatif", value: "index" },
        { label: "Nama", value: "name" },
        { label: "Nilai Preferensi Qi", value: "qi" }
      ],
      content: tableData.map(row => ({
        index: row.index,
        name: row.name,
        qi: row.qi
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
