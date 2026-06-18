const { Pool } = require('pg');

const pool = new Pool({
    host:     'localhost',
    port:     5432,
    database: 'my_database',
    user:     'postgres',
    password: 'QueensOtt2005!'
});

module.exports = pool;