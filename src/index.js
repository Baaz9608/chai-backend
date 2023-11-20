// require('dotenv').config({path: './env'})

import dotenv from 'dotenv';
import connectDB from "./db/index.js";

dotenv.config({
    path: './env'
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 3000, ()=>{
        console.log(`❤ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((error)=>{
    console.log('MONGO db connection failed !!!', error);

})






/*
;(async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        app.on("error", (error)=>{
            console.log('ERROR', error);
            throw error
        })

        app.length(process.env.PORT, ()=>{
            console.log(`App is listening on port ${process.env.PORT}`);
        })

    } catch (error) {
        console.error("ERROR", error);
        throw error
    }
})()*/