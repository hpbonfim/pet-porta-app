var convict = require('convict');
const fs = require('fs');

// Define a schema
var config = convict({
    env: {
        doc: "The application environment.",
        format: ["production", "development", "test"],
        default: "development",
        env: "NODE_ENV"
    },
    port: {
        doc: "The port to bind.",
        format: "port",
        default: 8080,
        env: "PORT",
        arg: "port"
    },
    db: {
        host: {
            doc: 'localhost',
            format: '*',
            default: 'db',
            env: 'DB_HOST'
        },
        name: {
            doc: "mysql",
            format: String,
            default: 'database',
            env: 'DB_NAME'
        },
        user: {
            doc: "admin",
            format: String,
            default: 'root',
            env: 'DB_USER'
        },
        password: {
            doc: "1234567890",
            format: String,
            default: 'password',
            env: 'DB_PASSWORD'
        }
    },
    redis: {
        host: {
            doc: 'redis',
            format: String,
            default: 'localhost',
            env: 'REDIS_HOST'
        },
    }
});

// Load environment dependent configuration
var env = config.get('env');
const envFile = './config/' + env + '.json'
if (fs.existsSync(envFile)) {
    config.loadFile(envFile);
}

// Perform validation
config.validate({ allowed: 'strict' });
module.exports = config;

