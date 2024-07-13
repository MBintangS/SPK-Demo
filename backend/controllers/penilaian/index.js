const update = require('./update') 
const store = require('./store') 
const destroy = require('./destroy') 
const getPenilaian = require('./getPenilaian')
const getPenilaianByStudentID = require('./getPenilaianByStudentID')
const getHasilPenilaian = require('./getHasilPenilaian')
module.exports = {
    getHasilPenilaian,
    getPenilaian,
    getPenilaianByStudentID,
    store,
    update,
    destroy,
}