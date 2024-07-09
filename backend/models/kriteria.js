const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Fields = new Schema(
  {
    kode: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    bobot: {
      type: Number,
      required: true
    },
    normalizedBobot: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      enum: ["cost", "benefit"],
      required: true
    },
  },
  { timestamps: true }
)

const Model = mongoose.model('Kriteria', Fields)

module.exports = Model
