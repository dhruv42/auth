const express = require('express');
const router = express.Router();
const middleware = require('../middleware/middleware');
const auth = require('./auth');
const search = require('./search-user');
const validate = require('../middleware/validator');

router.post('/auth/signup',validate("registerSchema"),auth.signup);
router.post('/auth/login',validate("loginSchema"),auth.login);
router.post('/auth/logout',middleware.verify,auth.logout);

router.get('/search',middleware.verify,search.searchUser);


module.exports = router;