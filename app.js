const express=require('express');
const bodyparser=require('body-parser');
const HttpError=require('./model/http-error');
const mongoose=require('mongoose');

//const placesRoutes=require('./routes/places-routes');
const empRoutes=require('./routes/employees-routes');

const app=express();

app.use(bodyparser.json());

app.use('/api/employees',empRoutes);

app.use((req,res,next)=>{
   const error=new HttpError('could not find this route',404);
   throw error;
})

app.use((error,req,res,next)=>{
    if(res.headerSent){
        return next(error);
    }
    res.status(error.code || 5000);
    res.json({message: error.message || 'An error occured.'});
});

mongoose.
  connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-qweix.azure.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`).
  then(() => {
    app.listen(5000);
  }).
  catch(
      err => {
          console.log(err);
      }
  );


