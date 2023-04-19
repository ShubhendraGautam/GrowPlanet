const express=require('express');
const app=express();
const bodyParser = require('body-parser');
const mysql=require("mysql2/promise")
const {spawn} = require('child_process');
const path = require('path');
const multer = require('multer');

require('dotenv').config()


// Multer upload
const multerStorage = multer.diskStorage({
 
    destination: (req, file, cb) => {
      // Get the type of file.
      const ext = file.mimetype.split("/")[0];
      
    cb(null, "uploads/images");
     
    },
    filename: (req, file, cb) => {
      // Combine the Date in milliseconds and original name and pass as filename
      cb(null, `${Date.now()}.${file.originalname}`);
    },
  });
   
  // Use diskstorage option in multer
  const upload = multer({ storage: multerStorage });



// MySQL connection 
function connection(){
    return mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "plantopedia"
    });
}
function connectionSellHere(){
    return mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "sell_crop"
    });
}
// MySQL connections ends


// Global Variables
var DATA;
var SellHere;
var plantLabResult;



// Disease API

function plantDisease(image){
    var hardCodedFile=[image]
    


    const base64files = hardCodedFile.map(file => fs.readFileSync(file, 'base64'));

    const data = {
    api_key: process.env.PLANT_ID_KEY,
    images: base64files,
    /* modifiers docs: https://github.com/flowerchecker/Plant-id-API/wiki/Modifiers */
    modifiers: ["crops_fast", "similar_images"],
    language: "en",
    /* disease details docs: https://github.com/flowerchecker/Plant-id-API/wiki/Disease-details */
    disease_details: ["cause",
        "common_names",
        "classification",
        "description",
        "treatment",
        "url"],
    };
    
    return data;

}






//News API

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('5e8dedc0684a4e799eb08edcfc3ce940');
  
  // Set the parameters for the API request
  const options = {
    q: 'organic farming OR cash crop  OR farming OR irrigation OR fertilizers'
  };
    
  async function runCompletion(){
     await newsapi.v2.everything(options).then(response => {
        news=response.articles;
        
      }).catch(error => {
        console.error(error);
      });
  }

// News API Ends






// Plant ID Setup

const axios = require('axios')
var fs = require('fs');




// Plant ID ends





app.use(express.static(__dirname+'/assests'));

app.set('view engine', 'ejs')


var USERNAME;
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended:false
}));





app.get("/",function(req,res){


  
    res.sendFile(__dirname+"/views/homepage.html");



})
app.get("/homepage.html",function(req,res){
    res.sendFile(__dirname+"/views/homepage.html");
})



// Plantopedia Backend Starts Here

app.get("/plantopedia.html",function(req,res){
    res.sendFile(__dirname+"/views/plantopedia.html")
})
app.post("/plantopedia",async function(req,res){
    var plant=req.body.plant_name;
    console.log(plant);

    var con=await connection();
    var sql1="SELECT * FROM plants WHERE name=(?)";
    DATA=await con.query(sql1,[plant],function(err,result){
        if(err) throw err ;
        return result;
        con.end();
    })
    
   res.redirect('/plant.ejs');
    
})

app.get("/plant.ejs",function(req,res){
    res.render('plant',{data:(DATA[0][0])});
})


app.get("/news.ejs", async function(req,res){
    await runCompletion();
    res.render('news',{ news: (news) });
    //res.sendFile(__dirname+"/views/news.ejs")
})




app.get("/plantDisease.html",function(req,res){

    
    res.sendFile(__dirname+"/views/plantDisease.html")
})
app.post("/plantDisease",upload.single("mypic"),async function(req,res){


    

    
    console.log("File: ", req.file);
    console.log(req.file.path)
   
    var data=plantDisease(req.file.path)

    var plant_disease=await axios.post('https://api.plant.id/v2/health_assessment', data).then(res => {
    
    return res.data;
    }).catch(error => {
    console.error('Error: ', error)
    })
    var is_healthy_probability= plant_disease.health_assessment.is_healthy_probability;
    var is_healthy= plant_disease.health_assessment.is_healthy;
    var disease_details= plant_disease.health_assessment.diseases[0].disease_details;
    console.log(plant_disease.images[0].url)
    var image=plant_disease.images[0].url
    sendDATA={probaility:is_healthy_probability,is_healthy:is_healthy,disease_details:disease_details,image:image}
    
    res.render("plantDiseaseInfo",sendDATA)
   
})
app.get("/plantDiseaseResult",function(req,res){
    res.render("plantDiseaseInfo")
})

// Plantopedia Backend Ends Here


// Plant Lab start here

app.get("/plantLab.html",function(req,res){
    res.sendFile(__dirname+"/views/plantLab.html")
})
app.post("/labForm",function(req,res){
    console.log(req.body)

    var dataToSend;
 // spawn new child process to call the python script
    let a=req.body.nitrogen
    let b=req.body.phosphorus
    let c=req.body.potassium
    let d=req.body.temperature
    let e=req.body.humidity
    let f=req.body.ph
    let g=req.body.rainfall

    console.log(a,b,c,d,e,f,g)

    const python = spawn('C:/Users/DELL/AppData/Local/Programs/Python/Python311/python.exe', ['python.py',a,b,c,d,e,f,g]);
    // collect data from script
    python.stdout.on('data', function (data) {
    console.log('Pipe data from python script ...');
    dataToSend = data.toString();
    });
    // in close event we are sure that stream from child process is closed
    python.on('close', (code) => {
    console.log(`child process close all stdio with code ${code}`);
    // send data to browser
    
    plantLabResult=dataToSend;

    res.redirect("/plantLabResult")
    });
    

})
app.get("/plantLabResult",function(req,res){
    
    res.render("plantLabResult",{data:plantLabResult})
})

app.post("/play",function(req,res){
    console.log(req.body)
    res.sendFile(__dirname+"/views/plantLab.html")
    
})


// Plant lab ends


// Sell Here 

app.get("/sellHere.html",function(req,res){
    res.sendFile(__dirname+"/views/sellHere.html")
})
app.post("/sellHereForm",async function(req,res){
    console.log(req.body)
    var crop=req.body.crop;
    var district=req.body.district
    var con=await connectionSellHere();
    var sql1="SELECT * FROM distance Inner join crop_price where distance.from=(?) and distance.to=crop_price.district and crop_price.crop=(?) ORDER BY crop_price.price-(distance.distance*distance.fare) DESC";
    SellHere=await con.query(sql1,[district,crop],function(err,result){
        if(err) throw err ;
        return result;
        
    })
    con.end();
    
    SellHere=SellHere[0]
    

    res.redirect("/sellHereResult.html")
})
app.get("/sellHereResult.html",function(req,res){

    res.render("sellHereResult",{data:SellHere})
})


// Sell Here ends


app.get("/contact.html",function(req,res){
    res.sendFile(__dirname+"/views/contact.html")
})

app.post("/contact",async function(req,res){
    var name=req.body.name
    var email=req.body.email
    var message=req.body.message

    var con=await connection();
    var sql1="INSERT INTO contact (name,email,message) VALUES (?,?,?)";
    await con.query(sql1,[name,email,message],function(err,result){
        if(err) throw err ;
        return result;
        
    })
    con.end();

    res.redirect("/homepage.html")

})



app.listen(3000,function(){
    console.log("Server started on port 3000");
});


