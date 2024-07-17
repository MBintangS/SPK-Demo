const update = require('./update') 
const store = require('./store') 
const getPenilaian = require('./getPenilaian')
const getPenilaianByStudentID = require('./getPenilaianByStudentID')
const getHasilPenilaian = require('./getHasilPenilaian')
const getHasilNormalisasi = require('./getHasilNormalisasi')
const getHasilPreferensiQi = require('./getHasilPreferensiQi')
const destroy = require('./destroy')
const getHasilAkhir = require('./getHasilAkhir')
const getHasilAkhirDownload = require('./getHasilAkhirDownload')
module.exports = {
    getHasilAkhirDownload,
    getHasilNormalisasi,
    getHasilPenilaian,
    getPenilaian,
    getPenilaianByStudentID,
    getHasilPreferensiQi,
    getHasilAkhir,
    store,
    update,
    destroy
}