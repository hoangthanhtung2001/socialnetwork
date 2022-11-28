// const router = require('express').Router()
// const messageCtrl = require('../controllers/messageCtrl')
// const auth = require('../middleware/auth')
import { Router } from 'express';
import messageCtrl from '../controller/messageCtrl.js';
import auth from '../middleware/auth.js';
const router = Router();
router.post('/message', auth, messageCtrl.createMessage);

router.get('/conversations', auth, messageCtrl.getConversations);

router.get('/message/:id', auth, messageCtrl.getMessages);

router.delete('/message/:id', auth, messageCtrl.deleteMessages);

router.delete('/conversation/:id', auth, messageCtrl.deleteConversation);

export default router;
