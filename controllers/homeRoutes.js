const router = require('express').Router();
const Project = require('../models/Project');

router.get('/', async (req, res) => {
  try {
    const projectData = await Project.findAll();

    const projects = projectData.map((project) => project.get({ plain: true }));

    res.render('projects', { projects });
  } catch (error) {
    console.log(error);

    res.status(500).send('There was an error');
  }
});

module.exports = router;
