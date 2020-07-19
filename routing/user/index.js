'user strict';

const Router = require('express').Router;
const ctrl = require('./controller');
const router = Router();

router.get('/user/personal/:id', ctrl.findById);
router.get('/user/list', ctrl.list);
router.put('/user/create', ctrl.create);
router.post('/user/update', ctrl.update);
router.post('/user/login', ctrl.login);
router.post('/user/routeStart/:id', ctrl.routeStart);

module.exports = router;
