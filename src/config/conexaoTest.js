const knexTest = require('knex')({
    client: 'pg',
    connection: {
        host: 'localhost',
        port: 5432,
        user: 'postgres',
        password: 'gh666',
        database: 'pdv'
    }
})

module.exports = knexTest;