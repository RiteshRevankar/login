const route = require('express').Router()
const userCtrl = require('../controller/userCtrl');
const auth = require('../middleware/auth');

route.post(`/register`, userCtrl.register);
route.post(`/login`, userCtrl.login);
route.get(`/logout`, userCtrl.logout);
route.get(`/users`, userCtrl.getUser);
route.get(`/refToken`, userCtrl.refreshToken);

route.put(`/users/:id`, userCtrl.updateUser);
route.delete(`/users/:id`, userCtrl.deleteUser);

module.exports = route;