const express = require('express');
const projectController = require('../controller/projectController');
const appRouter = express.Router();

appRouter.get('/', (req, res) => {
    return res.render('project.hbs');
});
appRouter.post('/', projectController.createProject);
appRouter.get('/backend', projectController.getAllProjects);
appRouter.get('/:id', projectController.getProjectById);
appRouter.patch('/:id', projectController.updateProjectById);
appRouter.delete('/:id', projectController.deleteProjectById);

module.exports = appRouter;