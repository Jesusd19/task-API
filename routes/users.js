module.exports = app => {

    app.get("/users/:id", (req, res) => {
        app.db.Users.findById(req.params.id, {
            attributes: ["id", "name", "email"]
        })
            .then(result => res.json(result))
            .catch(error => {
                res.status(412).json({ msg: error.message });
            });
    });

    app.delete('/users/:id', (req, res) => {
        app.db.Users.destroy({ where: { id: req.params.id } })
            .then(result => res.sendSatus(204))
            .catch(error => {
                res.status(412).json({ msg: error.message });
            });
    });

    app.post('/users', (req, res) => {
        app.db.Users.create(req.body)
            .then(result => res.json(result))
            .catch(error => {
                res.status(412).json({ msg: error.message });
            });
    });
};