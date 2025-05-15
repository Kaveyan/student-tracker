const express = require('express');
const router = express.Router();
const { 
    uploadachivement, 
    uploadcertificate, 
    uploadclanguage, 
    uploadlanguage, 
    uploadproject, 
    uploadps,
    list,
    getFacultyDomainData,
    updateVerificationStatus,
    Rank

} = require('../controller/uploadcontroller');
const authMiddleware = require('../middleware/authMiddleware'); // Import the middleware

router.post('/project', authMiddleware, uploadproject);
router.post('/language', authMiddleware, uploadlanguage);
router.post('/ps', authMiddleware, uploadps);
router.post('/certificate', authMiddleware, uploadcertificate);
router.post('/clanguage', authMiddleware, uploadclanguage);
router.post('/achivement', authMiddleware, uploadachivement);
router.get('/list', authMiddleware, list)
router.get('/domain-data', authMiddleware, getFacultyDomainData);
router.patch('/update-verification/:id', authMiddleware, updateVerificationStatus);
router.get('/rank', authMiddleware, Rank)


module.exports = router;
