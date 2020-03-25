
var express = require('express');
var app = express();
var bodyParser = require('body-parser')

/** 7) Root-level Middleware - A logger */
// --> 7)  Mount the Logger middleware here
const logMiddleware = (req,res,next) => {
  console.log(req.method+" "+req.path+" - ip"+req.ip)
  next()  
}

app.use(logMiddleware)

/** 8) Chaining middleware. A Time server */
const timeMiddleware = (req,res,next)=>{  
  req.time=new Date().toString();
  next()  
};

app.get('/now',timeMiddleware ,(req,res)=>{  
  res.json({time: req.time})
})


// --> 11)  Mount the body-parser middleware  here
/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !
app.use(bodyParser.urlencoded({extended: false}))

/** 1) Meet the node console. */
console.log("Hello World")

/** 2) A first working Express Server */
/*app.get("/", (req,res)=>{  
  res.send("Hello Express")
})
*/


/** 3) Serve an HTML file */
app.get("/", (req,res)=>{  
  let absolutePath = __dirname + "/views/index.html"
  res.sendFile(absolutePath)
})


/** 4) Serve static assets  */
let publicPath = __dirname + "/public"
app.use("/", express.static(publicPath) )


/** 5) serve JSON on a specific route */
/** 6) Use the .env file to configure the app */
app.get("/json", (req,res)=>{    
  let response = {"message": "Hello json"}
  if(process.env.MESSAGE_STYLE=="uppercase") response.message= response.message.toUpperCase()
  res.json(response)
})



/** 9)  Get input from client - Route parameters */
app.get("/:word/echo", (req,res)=>{    
  let response = {"echo": req.params.word}
  res.json(response)
})


/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>
app.get("/name", (req,res)=>{    
  const {first,last } = req.query; 
  res.json({"name": first+" "+last})
})
  

/** 12) Get data form POST  */
app.post("/name", (req,res)=>{    
  const {first,last } = req.body; 
  res.json({"name": first+" "+last})
})


// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

 module.exports = app;
