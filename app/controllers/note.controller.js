const express=require('express');
const mongodb=require('mongodb');
//create and save new note
const mongoUrl="mongodb+srv://admin:admin@cluster0-cronx.mongodb.net/easy-notes?retryWrites=true&w=majority";
const uri =process.env.MONGODB_URI || mongoUrl;
const MongoClient = mongodb.MongoClient;
const client = new MongoClient(uri, { useNewUrlParser: true });
exports.create=(req,resp)=>{
    client.connect(err => {
    const collection = client.db("easy-notes").collection("notes");
    // perform actions on the collection object
    console.log("successfully connected");
    collection.insertOne(req.body,(err,result)=>{
        
        if(err){
            console.log(err);
            process.exit(0);
            
        }else{
            resp.status(200).send("Successfully added");
        }
        console.log(result);
      
    })
    client.close();
    });
},
exports.findAll=(req,resp)=>{
    client.connect(err => {
        const collection = client.db("easy-notes").collection("notes");
        // perform actions on the collection object
        console.log("successfully connected");
        collection.find().toArray((err,result)=>{
            if(err){
                console.log(err);
                process.exit(0);
                
            }else{
                resp.status(200).send(result);
            }
            console.log(result);
        })
        client.close();
    });
}



