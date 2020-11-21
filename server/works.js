const express = require('express');
const worksRouter = express.Router();
const {getAllFromDatabase, getFromDatabaseById, addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId} = require("./db");

worksRouter.param('workId', (req, res, next, workId) => {
    const work = getFromDatabaseById('work', workId);
    if (work) {
      req.work = work;
      next();
    } else {
      res.status(404).send();
    }
})
worksRouter.get('/', (req, res, next) => {
    const works = getAllFromDatabase('work');
    const minionId = req.minion.id;
    const result = works.filter(work => minionId === work.minionId);

    res.send(result);
});

worksRouter.post('/', (req, res, next) => {
    const minionId = req.minion.id;
    req.body.minionId = minionId;
    const added = addToDatabase('work', req.body);

    res.status(201).send(added);
});

worksRouter.put('/:workId', (req, res, next) => {
    const minion = getFromDatabaseById('minions', req.body.minionId);
    if(!minion) {
        return res.status(400).send();
    }
    const updated = updateInstanceInDatabase("work", req.body);

    if(updated) {
        return res.send(updated);
    }

    res.status(404).send();
});

worksRouter.delete('/:workId', (req, res, next) => {
    deleteFromDatabasebyId('work', req.params.workId);
    res.status(204).send();
})

module.exports = worksRouter;