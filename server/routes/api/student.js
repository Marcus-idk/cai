const express = require('express')
const router = express.Router()
const studentController = require('../../controllers/studentController');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// router.get('/updateStudent', studentController.updateStudent);
router.post('/submit-form', upload.single('resume'), studentController.handleSubmitForm);


module.exports = router