var convict = require('convict');
const fs = require('fs');

// Define a schema
var rules = convict({
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
var env = rules.get('env');
const envFile = './rules/' + env + '.json'
if (fs.existsSync(envFile)) {
    rules.loadFile(envFile);
}

// Perform validation
rules.validate({ allowed: 'strict' });
module.exports = rules;
