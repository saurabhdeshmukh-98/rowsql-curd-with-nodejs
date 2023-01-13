const router=require('express').Router()
const contro=require('../controller/custumContro')

router.post('/insert',contro.add);
router.post('/save',contro.insert);
router.get('/fetch',contro.getData);
router.put('/newData',contro.modifyData);
router.delete('/move',contro.remove);
router.get('/bulkofser',contro.bulkOfData);
router.post('/mapdata',contro.oneToOneDataInsertMap);
router.get('/fetchjoin',contro.oneRecordFromJoin);
router.put('/modifyjoin',contro.updateOneRecordFromJoin);
router.delete('/movejoin',contro.deleteFormJoin);

module.exports=router