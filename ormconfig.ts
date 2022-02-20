import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

const config:PostgresConnectionOptions = {
    "type":"postgres",
    "host":"localhost",
    "port":5432,
    "username":"postgres",
    "password":".",
    "database":"birthday_app",
    // "entities":['./dist/**/*.entity.js'],
    "entities":['./**/*.entity.ts'], //  Use this for e2e test
    "synchronize":true,
    "migrations":[
        './dist/src/migrations/*.js'
    ],
    "cli":{
        "migrationsDir":'./src/migrations'
    },
    "migrationsTableName": "migration"
  }

export default config;