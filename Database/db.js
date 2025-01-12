import mongoose from "mongoose";

  function connect(){
    mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log('Connected to MongoDB');
    }).catch((err=>{
        console.error('Error connecting to MongoDB:',err.message);
        process.exit(1);
    }
    ))
    
 }
 
 export default connect;