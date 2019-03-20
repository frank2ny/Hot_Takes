const express = require('express');
const sourceCtrl=require('../controller/source')
const router = express.Router();
//const Source=require('../models/source');
const auth=require('../middleware/auth');
const multer=require('../middleware/multer-config');

router.post('/',auth,multer,sourceCtrl.createSauce);
router.get('/',auth, sourceCtrl.getallSauce);
router.delete('/:id',auth,sourceCtrl.deleteSauce);
  router.get('/:id',auth, sourceCtrl.oneSauce);
 router.put('/:id',auth,multer,  sourceCtrl.updateSauce);
// router.post('/',auth,,sourceCtrl.likeSauce);

module.exports = router;