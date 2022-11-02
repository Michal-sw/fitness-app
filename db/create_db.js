const { Client } = require('pg');

require('dotenv').config();

const dbConnData = {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: 'postgres',
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD
}

const client = new Client(dbConnData)

client.connect().then(async () => {
    try {
        await client.query("SELECT datname FROM pg_database;", async (err, result) => {
            if (err) throw err;
            if (result.rows.find(x => x['datname'] === process.env.POSTGRES_DB) === undefined) {
                await client.query(`CREATE DATABASE ${process.env.POSTGRES_DB};`, async (err) => {
                    if (err) throw err;
                    console.log(`Created database ${process.env.POSTGRES_DB}`);
                    client.end();
                })
            } else console.log(`Database "${process.env.POSTGRES_DB}" already exists`);
        });
    } catch (e) {
        console.log('Something went wrong with connecting to the db: ');
        console.error(e);
    }
});