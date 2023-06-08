const paginationAdapter = (req, res, next) => {
  req.query._page = req.query.nextPageToken || 1;
  req.query._limit = 20;
  next();
};

const copyQueryString = (req, res, next) => {
  res.locals.query = { ...req.query };
  next();
};

module.exports = [paginationAdapter, copyQueryString];
