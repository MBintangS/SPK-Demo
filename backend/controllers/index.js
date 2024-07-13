const auth = require('./auth')
const user = require('./users')
const kriteria = require('./kriteria')
const student = require('./students')
const subKriteria = require('./subKriteria')
const penilaian = require('./penilaian')

module.exports = {
    subKriteria,
    user,
    kriteria,
    student,
    auth,
    penilaian,
}