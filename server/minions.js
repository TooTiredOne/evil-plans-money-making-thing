const express = require('express');
const minionsRouter = express.Router();
const {getAllFromDatabase, getFromDatabaseById, addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId} = require("./db");

minionsRouter.param('id', (req, res, next, id) => {
    const minion = getFromDatabaseById('minions', id);
    if (minion) {
      req.minion = minion;
      next();
    } else {
      res.status(404).send();
    }
  });

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

minionsRouter.get("/:id", (req, res, next) => {
    res.send(req.minion);
});

minionsRouter.put("/:id", (req, res, next) => {
    const updated = updateInstanceInDatabase("minions", req.body);

    if(updated) {
        return res.send(updated);
    }

    res.status(404).send();
});

minionsRouter.delete("/:id", (req, res, next) => {
   deleteFromDatabasebyId('minions', req.params.id);
   res.status(204).send();
    
});



module.exports = minionsRouter;