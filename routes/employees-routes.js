const express=require('express');
const router = express.Router();

const employeeController=require('../controller/employee-controller');

router.post('/',employeeController.createEmployee);
router.get('/:pid',employeeController.getEmployee);


module.exports=router;