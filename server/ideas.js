const express = require('express');
const ideasRouter = express.Router();
const {getAllFromDatabase, getFromDatabaseById, addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId} = require("./db");
const checkMillionDollarIdea = require('./checkMillionDollarIdea');

ideasRouter.param('id', (req, res, next, id) => {
    const idea = getFromDatabaseById('ideas', id);
    if (idea) {
      req.idea = idea;
      next();
    } else {
      res.status(404).send();
    }
  });

ideasRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('ideas'));
});

ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    const newInstance = addToDatabase("ideas", req.body);
    res.status(201).send(newInstance);
});

ideasRouter.get('/:id', (req, res, next) => {
    res.send(req.idea);
});

ideasRouter.put('/:id', checkMillionDollarIdea, (req, res, next) => {
    const updated = updateInstanceInDatabase("ideas", req.body);
    if(updated) {
        return res.send(updated);
    }

    res.status(404).send();
});

ideasRouter.delete('/:id', (req, res, next) => {
    deleteFromDatabasebyId('ideas', req.params.id);
    res.status(204).send();
});


module.exports = ideasRouter;