import fs from "fs";
import path from "path";
import Sequelize from "sequelize";
import * as config from './libs/config';


var db = {};



console.log(config.database);
console.log(config.username);
console.log(config.password);
console.log(config.host);
console.log(config.port);
console.log(config.schema);

// const sequelize = new Sequelize({
//     host: config.host,
//     port: config.port,
//     database: config.database,
//     username: config.username,
//     password: config.password,
//     define: {
//         schema: config.schema
//     }
// });
var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    define: {
        schema: config.schema
    }
});


// const sequelize = new Sequelize("postgres://larpjour:idIjzuU8a3vUqH-g6SSe9PFAlHdKHybb@pellefant.db.elephantsql.com:5432/larpjour");


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
