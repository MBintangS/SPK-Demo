const update = require('./update') 
const store = require('./store') 
const getPenilaian = require('./getPenilaian')
const getPenilaianByStudentID = require('./getPenilaianByStudentID')
const getHasilPenilaian = require('./getHasilPenilaian')
const getHasilNormalisasi = require('./getHasilNormalisasi')
const getHasilPreferensiQi = require('./getHasilPreferensiQi')
module.exports = {
    getHasilNormalisasi,
    getHasilPenilaian,
    getPenilaian,
    getPenilaianByStudentID,
    getHasilPreferensiQi,
    store,
    update,
}