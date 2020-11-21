const express = require('express');
const minionsRouter = express.Router();
const {getAllFromDatabase, getFromDatabaseById, addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId} = require("./db");

minionsRouter.get('/', (req, res, next) => {
    const minions = getAllFromDatabase("minions");
    res.send(minions);
});

minionsRouter.post('/', (req, res, next) => {
    const name = req.body.name;
    const title = req.body.title;
    const salary = Number(req.body.salary);
    const weaknesses = req.body.weaknesses;

    const newInstance = addToDatabase('minions', {
        name: name,
        title: title,
        salary: salary,
        weaknesses: weaknesses
    });

    res.status(201).send(newInstance);

});

minionsRouter.get("/:minionId", (req, res, next) => {
    const minion = getFromDatabaseById('minions', req.params.minionId);

    if(minion) {
        return res.send(minion);
    }
    res.status(404).send();
});

minionsRouter.put("/:minionId", (req, res, next) => {
    const updated = updateInstanceInDatabase("minions", req.body);

    if(updated) {
        return res.send(updated);
    }

    res.status(404).send();
})

minionsRouter.delete("/:minionId", (req, res, next) => {
    const deleted = deleteFromDatabasebyId('minions', req.params.minionId);

    if(deleted) {
        return res.status(204).send();
    }
    
    res.status(404).send();
})

module.exports = minionsRouter;