const mysql = require('mysql');
const AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-1' });

const ssm = new AWS.SSM();

async function getParameters(names) {
    const params = {
        Names: names,
        WithDecryption: true
    };

    try {
        const data = await ssm.getParameters(params).promise();
        if (data.InvalidParameters.length > 0) {
            throw new Error(`Invalid parameters: ${data.InvalidParameters.join(', ')}`);
        }
        const result = {};
        data.Parameters.forEach(param => {
            result[param.Name] = param.Value;
        });
        return result;
    } catch (err) {
        console.error("Failed to load parameters from SSM:", err);
        throw err;
    }
}

const paramNames = [
    '/myapp/db/host',
    '/myapp/db/user',
    '/myapp/db/password',
    '/myapp/db/database'
];

// Instead of exporting the pool directly (which may be undefined),
// we export an async function that returns the pool.
let connectionPool;

async function getPool() {
    if (connectionPool) {
        return connectionPool;
    }

    const params = await getParameters(paramNames);

    connectionPool = mysql.createPool({
        connectionLimit: 10,
        host: params['/myapp/db/host'],
        user: params['/myapp/db/user'],
        password: params['/myapp/db/password'],
        database: params['/myapp/db/database']
    });

    // Test connection once
    connectionPool.getConnection((err, connection) => {
        if (err) {
            console.error("Error connecting to DB:", err);
        } else {
            console.log("✅ Successfully connected to DB.");
            connection.release();
        }
    });

    process.on('exit', () => {
        if (connectionPool) connectionPool.end();
    });

    return connectionPool;
}

module.exports = { getPool, getParameters };