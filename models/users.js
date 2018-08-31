module.exports = (sequelize, DataType) => {
    var Users = sequelize.define("Users", {
        idUser: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'id_user'
        },
        name: {
            type: DataType.STRING,
            allowNull: false,
            field: 'name'
        },
        password: {
            type: DataType.STRING,
            allowNull: false,
            field: 'password'
        },
        email: {
            type: DataType.STRING,
            unique: true,
            allowNull: false,
            field: 'email'
        }
    }, {
            tableName: 'users'
        });

    Users.associate = (models) => {
        models.Users.hasMany(models.Tasks, {
            foreignKey: 'id_user_fk',
            sourceKey: 'id_user'
        });
    };

    return Users;
};