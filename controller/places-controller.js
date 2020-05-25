const HttpError=require('../model/http-error');
const uuid=require('uuid/v4');
const Place=require('../model/place');

const getPlaceById = async (req,res,next)=>{   

    const title=req.params.pid;
        let place;

        try
        {
         place= await Place.find({title: title});
        }
        catch(err){
          const error=new HttpError('failed',500);
          return next(error);
        }
        if(!place){
            const error=new HttpError('could not find a place',404);
            return next(error);
        }
        res.json({place});
}

const createPlace= async (req,res,next)=>{
    const {title,description} = req.body;
    
    const createdPlace=new Place({
        title,
        description,
        friends:'d'
    });
    try{
        await createdPlace.save();
    }catch(err){
        const error=new HttpError('failed',500);
        return next(error);
    }
    res.status(201).json({place:createdPlace});
  }


const getUserById=(req,res,next)=>{
    var mongoClient = require("mongodb").MongoClient;

    mongoClient.connect("mongodb://producttest:MRPzaSx4dHDPbfeX6ftUeDE9ZIaPK3LMIMKzzFbBiBnT29pxLRDItuzP5EGxXDkoVm2PquJXlETtnHrrTswH5g==@producttest.mongo.cosmos.azure.com:10255/?ssl=true&appName=@producttest@", function (err, db) {
        
        var dbo = db.db("mydb");
        var myobj = { name: "Company Inc", address: "Highway 37" };

        var query = { name: "Company Inc" };
        dbo.collection("customers").find(query).toArray(function(err, result) {
        if (err) throw err;
        console.log('j');
        res.json({result});
        db.close();
        
  });
  
});


    const userId=req.params.uid;
    const place=DUMMY_PLACES.find(p => 
      {
          return p.userId === userId;
      });
      if(!place){
        throw new HttpError('could not find a user.',404);
       }
       res.json({place});
  }

const updatePlace=(req,res,next)=>{
    const {title,description} = req.body;
    const placeId=req.params.pid;

    const updatedPlace={...DUMMY_PLACES.find(p=>p.id===placeId)};
    const placeIndex=DUMMY_PLACES.findIndex(p=>p.id===placeId);

    updatedPlace.title=title;
    updatedPlace.description=description;

    DUMMY_PLACES[placeIndex]=updatedPlace;

    res.status(200).json({place:updatedPlace});
}

const deletePlace=(req,res,next)=>{
  
}

  exports.getPlaceById=getPlaceById
  exports.getUserById=getUserById;
  exports.createPlace=createPlace;
  exports.updatePlace=updatePlace;
  exports.deletePlace=deletePlace;