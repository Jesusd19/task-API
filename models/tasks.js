module.exports = (sequelize, DataType) => {
    var Tasks = sequelize.define("Tasks", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'id_tasks'
        },
        title: {
            type: DataType.STRING,
            allowNull: false,
            field: 'title'
        },
        done: {
            type: DataType.BOOLEAN,
            defaultValue: false,
            allowNull: false,
            field: 'done'
        }
    }, {
        tableName: 'tasks'
    });

    Tasks.associate = (models) => {
        models.Tasks.belongsTo(models.Users, {
            foreignKey: 'id_user_fk',
            targetKey: 'idUser',
            as: 'Users'
        });
    };

    return Tasks;
}