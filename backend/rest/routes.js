const { Router } = require('express');

const IssuerController = require('./controller/IssuerController');
const BadgeClassController = require('./controller/BadgeClassController');
const AssertionsController = require('./controller/AssertionsController');
const UserController = require('./controller/UserController');


const fileUploadController= require('./controller/UploadController');
const upload = require('./middlewares/upload-middleware');

const router = Router()

router.get('/issuer', IssuerController.list);
router.post('/issuer', IssuerController.insert);
router.delete('/issuer/:id', IssuerController.delete);
router.patch('/issuer', IssuerController.update);

router.get('/badgeclass', BadgeClassController.list);
router.post('/badgeclass', BadgeClassController.insert);
router.delete('/badgeclass/:id', BadgeClassController.delete);
router.patch('/badgeclass', BadgeClassController.update);

router.get('/assertions', AssertionsController.list);
router.post('/assertions', AssertionsController.insert);
router.delete('/assertions/:id', AssertionsController.delete);
router.patch('/assertions/', AssertionsController.revoke);

router.post('/users', UserController.create);
router.put('/users/:id', UserController.update);
router.put('/users/password/:id', UserController.update_password);
router.get('/users', UserController.list);
router.post('/users/test', UserController.test);
router.delete('/users/:id', UserController.delete);

router.post('/files', upload.single('file'), fileUploadController.uploadSingle);
router.get('/files/:file', fileUploadController.downloadSingle);


module.exports = router;