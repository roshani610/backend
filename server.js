const express=require('express')
const bodyParser=require('body-parser')
const port=process.env.PORT || 3000;

//create an  app
const app=express();
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.set('view engine', 'ejs');
app.get('/',(req,resp)=>{
   // resp.json({"message":"Hello world"})
   res.render('index');
});

//defining routes
require('./app/routes/note.routes.js')(app);

app.listen(port,()=>{
    console.log("Server is listening on port 3000");
})
