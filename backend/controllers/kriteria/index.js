const destroy = require('./destroy')
const getKriteriaByID = require('./getKriteriaByID')
const getKriterias = require('./getKriterias')
const store = require('./store') 
const update = require('./update')

module.exports = {
    getKriterias,
    getKriteriaByID,
    store,
    update,
    destroy,
}