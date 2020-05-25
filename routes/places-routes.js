const express=require('express');
const router = express.Router();

const placesController=require('../controller/places-controller');

router.post('/',placesController.createPlace);
router.get('/:pid',placesController.getPlaceById);
//router.get('/user/:uid',placesController.getUserById);
//router.patch('/:pid',placesController.updatePlace);
//router.delete('/:pid',placesController.deletePlace);


module.exports=router;