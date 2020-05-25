const HttpError=require('../model/http-error');
const uuid=require('uuid/v4');
const Employee=require('../model/employee');

const getEmployee = async (req,res,next)=>{   
    //const title=req.params.pid;
        let employee;
        try
        {
            employee= await Employee.find({createdBy: 'zameer'});
        }
        catch(err){
          const error=new HttpError('failed',500);
          return next(error);
        }
        if(!employee){
            const error=new HttpError('could not find a employee',404);
            return next(error);
        }
        res.json({employee});
}

const createEmployee= async (req,res,next)=>{
    const {id,empName,empAddress,createdBy} = req.body;
    
    const createdEmployee=new Employee({
        id,
        empName,
        empAddress,
        createdBy:'zameer'
    });
    try{
        await createdEmployee.save();
    }catch(err){
        const error=new HttpError('failed',500);
        return next(error);
    }
    res.status(201).json({employee:createdEmployee});
  }

  exports.getEmployee=getEmployee;
  exports.createEmployee=createEmployee;