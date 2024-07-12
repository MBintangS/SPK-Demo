const getSubKriteria = require('./getSubKriteria') 
const getSubKriteriaByID = require('./getSubKriteriaByID') 
const getSubKriteriaByKriteriaID = require('./getSubKriteriaByKriteriaID') 
const update = require('./update') 
const store = require('./store') 
const destroy = require('./destroy') 
module.exports = {
    getSubKriteriaByID,
    getSubKriteria,
    getSubKriteriaByKriteriaID,
    store,
    update,
    destroy,
}