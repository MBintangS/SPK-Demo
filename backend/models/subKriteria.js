const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Fields = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    score: {
      type: Number,
      required: true
    },
    kriteria_id: { type: Schema.Types.ObjectId, ref: 'Kriteria', required: true }
  },
  { timestamps: true }
)

const Model = mongoose.model('SubKriteria', Fields)

module.exports = Model
