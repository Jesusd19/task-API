module.exports = app => {
    app.route('/tasks')
        .all((req, res, next) => {
            //Middlware for preexecution of routes
            delete req.body.id;
            next();
        })
        .get((req, res) => {
            // "/tasks": List tasks
            console.log(typeof Tasks);

            app.db.Tasks.findAll({})
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        })
        .post((req, res) => {
            // "/tasks": Save new task
            app.db.Tasks.create(req.body)
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        });

    app.route('/tasks/:id')
        .all((req, res, next) => {
            //Middleware for preexecution of routes
            delete req.body.id;
            next();
        })
        .get((req, res) => {
            // "/tasks/1": Find a task
            app.db.Tasks.findOne({ where: req.params })
                .then(result => {
                    if (result) {
                        res.json(result);
                    } else {
                        res.sendStaus(404);
                    }
                })
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        })
        .put((req, res) => {
            // "/tasks/1": Update a task
            app.db.Tasks.update(req.body, { where: req.params })
                .then(result => res.sendStaus(204))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        })
        .delete((req, res) => {
            // "/tasks/1": Delete a task
            app.db.Tasks.destroy({ where: req.params })
                .then(result => res.sendStaus(204))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        });
};