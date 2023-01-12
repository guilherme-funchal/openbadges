const { Router } = require('express');

const IssuerController = require('./controller/IssuerController');
const BadgeClassController = require('./controller/BadgeClassController');
const AssertionsController = require('./controller/AssertionsController');
const UserController = require('./controller/UserController');
const UserAuth = require('./controller/UserAuth');

const fileUploadController= require('./controller/UploadController');
const upload = require('./middlewares/upload-middleware');

const router = Router()

router.get('/issuer', IssuerController.list);
router.post('/issuer', IssuerController.insert);
router.delete('/issuer/:id', IssuerController.delete);
router.patch('/issuer', IssuerController.update);

router.get('/badgeclass', BadgeClassController.list);
router.get('/badgeclass/:entityId', BadgeClassController.search);
router.post('/badgeclass', BadgeClassController.insert);
router.delete('/badgeclass/:id', BadgeClassController.delete);
router.patch('/badgeclass', BadgeClassController.update);

router.get('/assertions', AssertionsController.list);
router.get('/assertions/:entityId', AssertionsController.search);
router.post('/assertions', AssertionsController.insert);
router.delete('/assertions/:entityId', AssertionsController.delete);
router.patch('/assertions/', AssertionsController.revoke);
router.post('/assertions/file', upload.single('file'), AssertionsController.check_file);
router.get('/assertions/file/:id', AssertionsController.get_badge);

router.post('/users', UserController.create);
router.put('/users/:id', UserController.update);
router.put('/users/password/:id', UserController.update_password);
router.get('/users', UserController.list);
router.get('/users/:entity_id', UserController.search);
router.post('/users/test', UserController.test);
router.delete('/users/:id', UserController.delete);

router.post('/files', upload.single('file'), fileUploadController.uploadSingle);
router.get('/files/:file', fileUploadController.downloadSingle);

router.post('/user/login', UserAuth.login);
router.post('/user/refresh', UserAuth.RefreshToken);

module.exports = router;