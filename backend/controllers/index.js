const auth = require('./auth')
const user = require('./users')
const kriteria = require('./kriteria')
const student = require('./students')
const subKriteria = require('./subKriteria')

module.exports = {
    subKriteria,
    user,
    kriteria,
    student,
    auth
}