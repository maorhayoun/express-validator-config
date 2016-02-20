'use strict';

module.exports = function validatorConfig (options) {
  options = options || {};
  if (!options.configuration) {
    throw new Error('no configuration was specified');
  }
  var mw = function (req, res, next)  {
    var routeValidations = options.configuration[req.route.path];
    if (!routeValidations) return next();

    if (routeValidations.query) {
      req.checkQuery(routeValidations.query);
    }
    if (routeValidations.body) {
      req.checkBody(routeValidations.body);
    }
    if (routeValidations.params) {
      req.checkParams(routeValidations.params);
    }
    if (req.validationErrors()) {
      return next(req.validationErrors());
    }
    next();
  };
  return mw;
}
