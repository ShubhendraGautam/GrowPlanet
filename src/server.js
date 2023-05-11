const express=require('express');
const app=express();
const bodyParser = require('body-parser');
const mysql=require("mysql2")
const {spawn} = require('child_process');
const path = require('path');
const multer = require('multer');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const { v4: uuidv4 } = require('uuid');
const NewsAPI = require('newsapi');

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
const Options = {                
    host: "localhost",
    user: "root",
    password: "root",
    database: "plantopedia"
};

//console.log(uuid());
const db = mysql.createConnection(Options).promise();
const sessionStore = new MySQLStore({}, db);


// MySQL connections ends


// Global Variables




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


const newsapi = new NewsAPI(process.env.NEWSAPI);
  
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



app.use(session({
    genid: (req) => {
        return uuidv4() // use UUIDs for session IDs
      },
    secret: 'cookie_secret',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
        maxAge: 600000,
        secure: false,
        httpOnly: true
    },
    rolling: true
      // assigning sessionStore to the session
}));


const redirectLogin = function(req,res,next){
    if(!req.session.loggedin)
    {
        return res.render('/login',{message:''});
    }
    next();
}


app.post("/signup",async function(req,res){
   
    var {type,name_signup,username,phone,password}=req.body
    
    var sql="INSERT INTO users(username,name,phone) VALUES(?,?,?)";
    await  db.query(sql,[username,name_signup,phone],function(err,result){
        if(err) throw err ;
        return result;
        
    })

    var sql="INSERT INTO login(username,password,type) VALUES(?,?,?)";
    await  db.query(sql,[username,password,type],function(err,result){
        if(err) throw err ;
        return result;
        
    })

    res.sendFile(__dirname+"/views/success.html")

    
})




app.get("/login",async function(req,res){
    if(req.session.loggedin==true){
        if(req.session.type=="farmer"){
            res.redirect("/farmer")
        }
        else{
            res.redirect("/business")
        }
    }

    else{
        var sql="SELECT username FROM users";
        var all_usernames=await  db.query(sql,[],function(err,result){
            if(err) throw err ;
            return result;
            
        })
    
    
       
        res.render('login',{usernames:all_usernames[0]})

    }
    
})



app.post("/login",async function(req,res){
    
    var { type, username, password} = req.body;
   
   


    
    var sql1="SELECT * FROM login WHERE username=(?)";

    try{
        var login_details=await  db.query(sql1,[username],function(err,result){
            if(err) throw err ;
            return result;
         
        })

        var password_in_db=login_details[0][0].password;
        var type_in_db=login_details[0][0].type;

        if(password_in_db==password && type_in_db==type){

            req.session.loggedin=true;
            req.session.username=username;
            req.session.type=type;

            if(type=="farmer"){
                res.redirect("/farmer")
            }
            else{
                res.redirect("/business")
            }

        }
        else{
            res.sendFile(__dirname+"/views/error.html")
        }

        
    }

    // If the username is not in Database
    catch(err){
        res.sendFile(__dirname+"/views/error.html")

    }
    

    
   

    
    
})

app.post("/allBidsFarmer",async function(req,res){
    var {bid_username}=req.body
    
    var sql2="SELECT * FROM users WHERE username=(?)";
    var username=await  db.query(sql2,[bid_username],function(err,result){
        if(err) throw err ;
        return result;
       
    })
    var sql="SELECT * FROM bids_farmer inner join bids_business on bids_farmer.bid_id_farmer=bids_business.bid_id_farmer where bids_farmer.username_farmer=(?) and bids_business.bid_accepted=1 ORDER BY bids_farmer.bid_id_farmer DESC;"
    var my_user=await  db.query(sql,[bid_username],function(err,result){
        if(err) throw err ;
        return result;
        
    })

   
    
    res.render('farmer_accepted_bids',{all_bids:my_user[0],username:username[0][0]})
})

app.get("/business",redirectLogin,async function(req,res){
    
    var username=req.session.username;
    

    
    var sql2="SELECT * FROM users WHERE username=(?)";
    var business_details=await  db.query(sql2,[username],function(err,result){
        if(err) throw err ;
        return result;
       
    })
    var sql="SELECT * FROM bids_farmer WHERE bids_farmer.bid_id_farmer NOT IN (SELECT bid_id_farmer FROM  bids_business WHERE bids_business.username_business =(?)) AND bids_farmer.bid_accepted=0 ORDER BY bids_farmer.bid_id_farmer DESC;"
    var all_bids=await  db.query(sql,[username],function(err,result){
        if(err) throw err ;
        return result;
        
    })
   
    res.render("businessPage",{all_bids:all_bids[0],business_details:business_details[0][0]})


})

app.post("/business_bid",async function(req,res){
    var { username,bid_amount,bid_id_farmer}=req.body
   


   
   
    var sql="INSERT INTO bids_business(bid_id_farmer,bid,username_business) VALUES(?,?,?)";
    await  db.query(sql,[bid_id_farmer,bid_amount,username],function(err,result){
        if(err) throw err ;
        return result;
        
    })
    res.redirect("/business")


})

app.post("/business_own_bids",async function(req,res){
    var {bid_username}=req.body
   

    var sql2="SELECT * FROM users WHERE username=(?)";
    var username=await  db.query(sql2,[bid_username],function(err,result){
        if(err) throw err ;
        return result;
       
    })
    var sql="SELECT * FROM bids_farmer inner join bids_business on bids_farmer.bid_id_farmer=bids_business.bid_id_farmer where bids_business.username_business=(?) ORDER BY bids_farmer.bid_id_farmer DESC;"
    var my_user=await  db.query(sql,[bid_username],function(err,result){
        if(err) throw err ;
        return result;
        
    })
    // res.send(my_user[0])
    
    res.render('business_owns_bid',{all_bids:my_user[0],username:username[0][0]})
})

app.post("/acceptBid",async function(req,res){
   
    var {bid_id_business,bid_id_farmer}=req.body

    
    var sql="UPDATE bids_business SET bid_accepted=1 WHERE bid_id_business=(?)";
    await  db.query(sql,[bid_id_business],function(err,result){
        if(err) throw err ;
        return result;
        
    })
    var sql="UPDATE bids_farmer  SET bid_accepted=1 WHERE bid_id_farmer=(?)";
    await  db.query(sql,[bid_id_farmer],function(err,result){
        if(err) throw err ;
        return result;
        
    })
    res.redirect("/farmer")
})

app.get("/farmer",redirectLogin,async function(req,res){
    
    var sql2="SELECT * FROM users WHERE username=(?)";
    var farmer_details=await  db.query(sql2,[req.session.username],function(err,result){
        if(err) throw err ;
        return result;
        
    })
   
    var farmers_bids;
    var sql3="SELECT * FROM bids_farmer WHERE username_farmer=(?) AND bid_accepted=0";
    var sql4="SELECT * FROM bids_business WHERE bid_id_farmer=(?)  ORDER BY bid DESC LIMIT 3";
    try{
        var farmers_bids=await  db.query(sql3,[req.session.username],function(err,result){
            if(err) throw err ;
            return result;
            
        })
        
        farmers_bids=farmers_bids[0]
        
        for(let i in farmers_bids){
            var business_bids=await  db.query(sql4,[farmers_bids[i].bid_id_farmer],function(err,result){
                if(err) throw err ;
                return result;
                
            })
            

            farmers_bids[i].business_bids=business_bids[0]
        }
        

    }
    catch(err){
        throw(err)
    }
    
   
    
    res.render('farmersPage',{data:farmers_bids,farmer_details:farmer_details[0][0]})
})



app.post("/farmer_post",async function(req,res){
    var {farmer,crop,base,quantity}=req.body
   

    

    try{
        var sql2="INSERT INTO bids_farmer(crop,base,quantity,username_farmer) VALUES(?,?,?,?)";
        await  db.query(sql2,[crop,base,quantity,farmer],function(err,result){
            if(err) throw err ;
            return result;
            
        })
        
       
        
        res.redirect('/farmer');

    }
    catch(err){
        res.send("Some Error Occured")

    }
    

   
})

app.get("/logout",function(req,res){
   req.session.destroy((err)=>{
   res.redirect('/');
   })
})

app.get("/homepage.html",function(req,res){
    res.sendFile(__dirname+"/views/homepage.html");
})
app.get("/",function(req,res){
    res.sendFile(__dirname+"/views/homepage.html");
})



// Plantopedia Backend Starts Here

app.get("/plantopedia.html",function(req,res){
    res.sendFile(__dirname+"/views/plantopedia.html")
})
app.post("/plantopedia",async function(req,res){

    var plant=req.body.plant_name;
    var DATA;

    try{
        var sql1="SELECT * FROM plants WHERE name=(?)";  
        DATA=await db.query(sql1,[plant],function(err,result){
            if(err) throw err ;
            return result;       
        }) 
        DATA=DATA[0][0]  
        DATA.isInDB=1;
    }
    catch(err){
        

        DATA={name:plant,message:'Sorry we do not have the data of the plant. We are constantly updating our systems to serve all requests. Please check after some time.',isInDB:0}
    }
    
   
    res.render('plant',{data:(DATA)});
    
})



app.get("/news", async function(req,res){
    await runCompletion();
    res.render('news',{ news: (news) });
    //res.sendFile(__dirname+"/views/news.ejs")
})


app.get("/allUsers",async function(req,res){
    var sql="SELECT * from users"
    var allUser=await db.query(sql,[],function(err,result){
        if(err) throw err ;
        return result;       
    }) 
    res.render('allUsers',{allUsers:allUser[0]})
})




app.get("/plantDisease.html",function(req,res){

    
    res.sendFile(__dirname+"/views/plantDisease.html")
})
app.post("/plantDisease",upload.single("mypic"),async function(req,res){


    

    
  
   
    var data=plantDisease(req.file.path)

    var plant_disease=await axios.post('https://api.plant.id/v2/health_assessment', data).then(res => {
    
    return res.data;
    }).catch(error => {
    console.error('Error: ', error)
    })
    var is_healthy_probability= plant_disease.health_assessment.is_healthy_probability;
    var is_healthy= plant_disease.health_assessment.is_healthy;
    var disease_details= plant_disease.health_assessment.diseases[0].disease_details;
  
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
    

    var dataToSend;
 // spawn new child process to call the python script
    let a=req.body.nitrogen
    let b=req.body.phosphorus
    let c=req.body.potassium
    let d=req.body.temperature
    let e=req.body.humidity
    let f=req.body.ph
    let g=req.body.rainfall

   

    const python = spawn('python3', ['python.py',a,b,c,d,e,f,g]);
    // collect data from script
    python.stdout.on('data', function (data) {
    console.log('Pipe data from python script ...');
    dataToSend = data.toString();
    });
    // in close event we are sure that stream from child process is closed
    python.on('close', (code) => {
    console.log(`child process close all stdio with code ${code}`);
    // send data to browser
    
    var plantLabResult=dataToSend;

    res.render("plantLabResult",{data:plantLabResult})
    });
    

})


app.post("/play",function(req,res){
   
    res.sendFile(__dirname+"/views/plantLab.html")
    
})


// Plant lab ends


// Sell Here 

app.get("/sellHere.html",function(req,res){
    res.sendFile(__dirname+"/views/sellHere.html")
})
app.post("/sellHereForm",async function(req,res){
   
    var crop=req.body.crop;
    var district=req.body.district
   
    var sql1="SELECT * FROM distance Inner join crop_price where distance.from=(?) and distance.to=crop_price.district and crop_price.crop=(?) ORDER BY crop_price.price-(distance.distance*distance.fare) DESC";
    var SellHere=await  db.query(sql1,[district,crop],function(err,result){
        if(err) throw err ;
        return result;
      
        
    })
     
    
    SellHere=SellHere[0]
    

    res.render("sellHereResult",{data:SellHere})
})



// Sell Here ends




app.post("/contact",async function(req,res){
    var name=req.body.name
    var email=req.body.email
    var message=req.body.message

    
    var sql1="INSERT INTO contact (name,email,message) VALUES (?,?,?)";
    await  db.query(sql1,[name,email,message],function(err,result){
        if(err) throw err ;
        return result;
        
    })
 

    res.redirect("/homepage.html")

})



app.listen(3000,function(){
    console.log("Server started on port 3000");
});


