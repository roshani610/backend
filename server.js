const express=require('express')
const bodyParser=require('body-parser')

//create an  app
const app=express();
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())


const dbConfig = require('./config/database.config.js');
const moongoes=require('mongoose')
//create db connection
moongoes.Promise=global.Promise;

moongoes.connect(dbConfig.url,{
    useNewUrlParser:true
}).then(()=>{
    console.log("Successfully connected to db");
}).catch(err=>{
    console.log("Not able to connect:",err);
    process.exit();
})

app.get('/',(req,resp)=>{
    resp.json({"message":"Hello world"})
});

//defining routes
require('./app/routes/note.routes.js')(app);

app.listen(3000,()=>{
    console.log("Server is listening on port 3000");
})
