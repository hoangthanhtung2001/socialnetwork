// const router = require('express').Router()
// const auth = require('../middleware/auth')
// const notifyCtrl = require('../controllers/notifyCtrl')
import { Router } from 'express';
import auth from '../middleware/auth.js';
import notifyCtrl from '../controller/notifyCtrl.js';

const router = Router();
router.post('/notify', auth, notifyCtrl.createNotify);

router.delete('/notify/:id', auth, notifyCtrl.removeNotify);

router.get('/notifies', auth, notifyCtrl.getNotifies);

router.patch('/isReadNotify/:id', auth, notifyCtrl.isReadNotify);

router.delete('/deleteAllNotify', auth, notifyCtrl.deleteAllNotifies);

export default router;
