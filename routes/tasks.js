import Tasks from '../models/tasks';
module.exports = app => {
    app.get('/tasks', (req, res) => {
        Tasks.findAll({}, (tasks) =>{
            res.json({tasks: tasks});
        });
    });
};