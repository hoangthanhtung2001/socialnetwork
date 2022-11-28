// const router = require('express').Router()
// const auth = require("../middleware/auth")
// const userCtrl = require("../controllers/userCtrl")
import { Router } from 'express';
import auth from '../middleware/auth.js';
import userCtrl from '../controller/userCtrl.js';
const router = Router();

router.get('/search', auth, userCtrl.searchUser);

router.get('/user/:id', auth, userCtrl.getUser);

router.patch('/user', auth, userCtrl.updateUser);

router.patch('/user/:id/follow', auth, userCtrl.follow);
router.patch('/user/:id/unfollow', auth, userCtrl.unfollow);

router.get('/suggestionsUser', auth, userCtrl.suggestionsUser);

export default router;
