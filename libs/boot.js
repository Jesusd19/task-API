const db = require('../db');

module.exports = app => {
    db.sequelize.sync().then(() => {

        app.listen(app.get("port"), () => {
            console.log(`Task API - Port ${app.get("port")}`);
        });
    }).catch(err => {
        console.log(err);
    });
};
