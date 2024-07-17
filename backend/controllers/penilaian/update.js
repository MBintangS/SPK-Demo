const { Penilaian, SubKriteria, Kriteria } = require("../../models");
const fastestValidator = require("fastest-validator");
const validator = new fastestValidator();

module.exports = async (req, res) => {
  const schemaValidation = {
    student_id: "string|empty:false",
    kriteria: "array|empty:false",
  };
  const validate = validator.validate(req.body, schemaValidation);

  if (validate.length) {
    return res.status(400).json({
      status: "error",
      message: validate,
    });
  }

  try {
    const results = await Promise.all(
      req.body.kriteria.map(async (data) => {
        try {
          const highScore = await SubKriteria.findOne({
            kriteria_id: data.kriteria_id,
          }).sort({ score: -1 });

          if (!highScore) throw new Error("High score tidak ditemukan");

          const lowScore = await SubKriteria.findOne({
            kriteria_id: data.kriteria_id,
          }).sort({ score: 1 });

          if (!lowScore) throw new Error("Low score tidak ditemukan");

          const studentScore = await SubKriteria.findById(
            data.sub_kriteria_id
          ).select("score");

          if (!studentScore) throw new Error("Student score tidak ditemukan");

          const kriteriaType = await Kriteria.findById(data.kriteria_id).select(
            "type"
          );

          if (!kriteriaType) throw new Error("Kriteria type tidak ditemukan");

          let normalizationScore;

          if (kriteriaType.type === "benefit") {
            normalizationScore = studentScore.score / highScore.score;
          } else {
            normalizationScore = lowScore.score / studentScore.score;
          }

          console.log(`Normalization Score for ${data.kriteria_id}:`, normalizationScore);

          const updated = await Penilaian.findOneAndUpdate(
            {
              student_id: req.body.student_id,
              kriteria_id: data.kriteria_id,
            },
            {
              sub_kriteria_id: data.sub_kriteria_id,
              normalization_score: normalizationScore,
              student_score: studentScore.score,
            },
            { new: true, upsert: true }
          );

          if (!updated) throw new Error("Error updating penilaian");

          return {
            status: "success",
            data: {
              id: updated.id,
            },
          };
        } catch (error) {
          console.error(`Error processing kriteria_id ${data.kriteria_id}:`, error.message);
          return {
            status: "error",
            message: error.message,
          };
        }
      })
    );

    const errors = results.filter((result) => result.status === "error");
    if (errors.length > 0) {
      return res.status(400).json({
        status: "error",
        message: errors.map((error) => error.message),
      });
    }

    return res.status(200).json({
      status: "success",
      data: results
        .filter((result) => result.status === "success")
        .map((result) => result.data),
    });
  } catch (error) {
    console.error("Internal server error:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
