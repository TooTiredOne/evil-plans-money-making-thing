const express = require('express');
const apiRouter = express.Router();
const {createMeeting, getAllFromDatabase, getFromDatabaseById, addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId, deleteAllFromDatabase} = require("./db");

apiRouter.get('/minions', (req, res, next) => {
    const minions = getAllFromDatabase("minions");
    res.send(minions);
});

apiRouter.post('/minions', (req, res, next) => {
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

apiRouter.get("/minions/:minionId", (req, res, next) => {
    const minion = getFromDatabaseById('minions', req.params.minionId);

    if(minion) {
        return res.send(minion);
    }
    res.status(404).send();
});

apiRouter.put("/minions/:minionId", (req, res, next) => {
    const updated = updateInstanceInDatabase("minions", req.body);

    if(updated) {
        return res.send(updated);
    }

    res.status(404).send();
})

apiRouter.delete("/minions/:minionId", (req, res, next) => {
    const deleted = deleteFromDatabasebyId('minions', req.params.minionId);

    if(deleted) {
        return res.status(204).send();
    }
    
    res.status(404).send();
})

module.exports = apiRouter;
