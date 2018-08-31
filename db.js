import fs from "fs";
import path from "path";
import Sequelize from "sequelize";
import * as config from './libs/config';

var db = {};

var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    define: {
        schema: config.schema
    }
});

const dir = path.join(__dirname, "models");
fs.readdirSync(dir).forEach(file => {
    console.log(file);
    
    const modelDir = path.join(dir, file);
    console.log(modelDir);
    
     const model = sequelize['import'](modelDir);
     console.log(model.name);
    
     db[model.name] = model;
});
Object.keys(db).forEach(key => {
    db[key].associate(db);
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
