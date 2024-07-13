const { Penilaian, SubKriteria } = require("../../models");
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
          })
            .sort({ score: -1 })
            .then((item) => item.score)
            .catch(() => {
              throw new Error("score tidak ditemukan");
            });

          const normalization_score = await SubKriteria.findById(
            data.sub_kriteria_id
          )
            .select("name score kriteria_id")
            .then((item) => item.score / highScore)
            .catch(() => {
              throw new Error("Sub Kriteria tidak ditemukan");
            });

          console.log(normalization_score);

          const created = await Penilaian.create({
            student_id: req.body.student_id,
            kriteria_id: data.kriteria_id,
            sub_kriteria_id: data.sub_kriteria_id,
            normalization_score: normalization_score,
          }).catch(() => {
            throw new Error("error create penilaian");
          });

          return {
            status: "success",
            data: {
              id: created.id,
            },
          };
        } catch (error) {
          return {
            status: "error",
            message: error.message,
          };
        }
      })
    );

    const errors = results.filter(result => result.status === "error");
    if (errors.length > 0) {
      return res.status(400).json({
        status: "error",
        message: errors.map(error => error.message),
      });
    }

    return res.status(201).json({
      status: "success",
      data: results.filter(result => result.status === "success").map(result => result.data),
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
