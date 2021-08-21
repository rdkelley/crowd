const router = require('express').Router();
const Project = require('../models/Project');
const User = require('../models/User');

const checkAuth = async (req, res, next) => {
  if (req.session.logged_in) {
    const user = await User.findByPk(req.session.user_id, {
      attributes: {
        exclude: ['password'],
      },
    });

    req.user = user.get({ plain: true });

    return next();
  }

  req.user = null;

  return next();
};

router.get('/', checkAuth, async (req, res) => {
  try {
    const projectData = await Project.findAll();

    const projects = projectData.map((project) => project.get({ plain: true }));

    res.render('projects', { projects, user: req.user });
  } catch (error) {
    console.log(error);

    res.status(500).send('There was an error');
  }
});

router.get('/login', (req, res) => {
  res.render('login');
});

module.exports = router;
