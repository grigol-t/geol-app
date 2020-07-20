'user strict';

const Router = require('express').Router;
const ctrl = require('./controller');
const router = Router();

router.get('/route/individual/:id', ctrl.findById);
router.get('/route/list', ctrl.list);
router.put('/route/create', ctrl.create);
router.post('/route/end/:id', ctrl.endRoute);
router.post('/route/delete/:id', ctrl.delete);

module.exports = router;
