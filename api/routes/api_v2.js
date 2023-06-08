/* eslint-disable */
const express = require('express');
const faker = require('faker');

const router = express.Router();

router.get('/users/self/profile/', (req, res) =>
  res.json(require('./data/users.self.profile.json'))
);

router.get('/users/self/memberships/', (req, res) =>
  res.json(require('./data/users.self.memberships.json'))
);

router.get('/users/self/projects/', (req, res) =>
  res.json(require('./data/users.self.projects.json'))
);

const titleRouter = express.Router();
const db = require('../db.json');

titleRouter.get('/', (req, res) =>
  res.status(500).json(require('./data/error.json'))
);

titleRouter.get('/accounts/:id/', (req, res) => {
  const id = req.params.id;
  const account = db.accounts.find(e => e.userID === id);
  if (!account) {
    return res.sendStatus(404);
  }

  res.json({
    data: {
      id: account.userID,
      name: account.userName,
      publicProfile: [
        [faker.database.column(), faker.lorem.word()],
        [faker.database.column(), faker.lorem.word()],
        [faker.database.column(), faker.lorem.word()],
        [faker.database.column(), faker.lorem.word()],
        [faker.database.column(), faker.lorem.word()],
      ],
      privateProfile: [
        [faker.database.column(), faker.lorem.word()],
        [faker.database.column(), faker.lorem.word()],
        [faker.database.column(), faker.lorem.word()],
        [faker.database.column(), faker.lorem.word()],
        [faker.database.column(), faker.lorem.word()],
      ],
    },
  });
});

titleRouter.get('/accounts/:id/teams/', (req, res) => {
  const id = req.params.id;
  const account = db.accounts.find(e => e.userID === id);
  if (!account) {
    return res.sendStatus(404);
  }

  res.json(require('./data/accounts.teams.json'));
});

router.use('/titles/3001/envs/cert/', titleRouter);

module.exports = router;
