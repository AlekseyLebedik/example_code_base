const moment = require('moment');

const authorize = (req, res) => {
  const { client, state, redirect_uri } = req.query;
  if (client === 'react' && state) {
    const accessToken = 'mockApiTestToken';
    const expiry = moment().add(1, 'd').unix();

    res.redirect(
      301,
      `${redirect_uri}#accessToken=${accessToken}&expiry=${expiry}&state=${state}`
    );
    return;
  }

  // eslint-disable-next-line global-require
  res.status(403).json(require('./data/error.json'));
};

module.exports = authorize;
