'user strict';

const Router = require('express').Router;
const ctrl = require('./controller');
const router = Router();

router.get('/vehicle/personal/:id', ctrl.findById);
router.get('/vehicle/list', ctrl.list);
router.put('/vehicle/create', ctrl.create);

module.exports = router;
