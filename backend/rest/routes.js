const { Router } = require('express');

const IssuerController = require('./controller/IssuerController');
const BadgeClassController = require('./controller/BadgeClassController');
const AssertionsController = require('./controller/AssertionsController');
const UserController = require('./controller/UserController');
const UserAuth = require('./controller/UserAuth');

const fileUploadController= require('./controller/UploadController');
const upload = require('./middlewares/upload-middleware');
const { verifyToken } = require('./middlewares/auth');

const router = Router()

router.get('/issuer', verifyToken, IssuerController.list);
router.post('/issuer', verifyToken, IssuerController.insert);
router.delete('/issuer/:id', verifyToken, IssuerController.delete);
router.patch('/issuer', verifyToken, IssuerController.update);

router.get('/badgeclass', verifyToken, BadgeClassController.list);
router.get('/badgeclass/:entityId', verifyToken, BadgeClassController.search);
router.post('/badgeclass', verifyToken, BadgeClassController.insert);
router.delete('/badgeclass/:id', verifyToken, BadgeClassController.delete);
router.patch('/badgeclass', verifyToken, BadgeClassController.update);

router.get('/assertions', verifyToken, AssertionsController.list);
router.get('/assertions/:entityId', verifyToken, AssertionsController.search);
router.post('/assertions', verifyToken, AssertionsController.insert);
router.delete('/assertions/:entityId', verifyToken, AssertionsController.delete);
router.patch('/assertions/', verifyToken, AssertionsController.revoke);
router.post('/assertions/file', verifyToken, upload.single('file'), AssertionsController.check_file);
router.get('/assertions/file/:id', verifyToken, AssertionsController.get_badge);

router.post('/users', verifyToken, UserController.create);
router.put('/users/:id', verifyToken, UserController.update);
router.put('/users/password/:id', verifyToken, UserController.update_password);
router.get('/users', verifyToken, UserController.list);
router.get('/users/:entity_id', verifyToken, UserController.search);
router.post('/users/test', verifyToken, UserController.test);
router.delete('/users/:id',verifyToken,  UserController.delete);

router.post('/files', verifyToken, upload.single('file'), fileUploadController.uploadSingle);
router.get('/files/:file', verifyToken, fileUploadController.downloadSingle);

router.post('/user/login', UserAuth.login);
router.post('/user/refresh', UserAuth.RefreshToken);

module.exports = router;