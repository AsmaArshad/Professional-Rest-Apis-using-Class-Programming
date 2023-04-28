const knex = require('knex')
const knexfile = require('./knexfile')

class DbConnection{
    constructor() {
        this.db = knex(knexfile.staging);
    }
}

module.exports = DbConnection
