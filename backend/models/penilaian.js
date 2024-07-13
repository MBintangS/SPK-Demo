const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Fields = new Schema(
  {
    student_id: {
      type: Schema.Types.ObjectId,
      ref: "Students",
      required: true,
    },
    kriteria_id: {
      type: Schema.Types.ObjectId,
      ref: "Kriteria",
      required: true,
    },
    sub_kriteria_id: {
      type: Schema.Types.ObjectId,
      ref: "SubKriteria",
      required: true,
    },
    normalization_score: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Model = mongoose.model("Penilaian", Fields);
module.exports = Model;
