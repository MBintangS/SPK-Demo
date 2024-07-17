const destroy = require('./destroy')
const getKriteriaByID = require('./getKriteriaByID')
const getKriterias = require('./getKriterias')
const getKriteriasBobot = require('./getKriteriasBobot')
const store = require('./store') 
const update = require('./update')

module.exports = {
    getKriterias,
    getKriteriaByID,
    getKriteriasBobot,
    store,
    update,
    destroy,
}