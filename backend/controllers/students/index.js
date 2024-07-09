const getStudents = require('./getStudents') 
const getStudentByID = require('./getStudentByID') 
const update = require('./update') 
const store = require('./store') 
const destroy = require('./destroy') 
module.exports = {
    getStudentByID,
    getStudents,
    store,
    update,
    destroy,
}