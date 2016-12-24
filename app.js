var express = require("express"),
    app = express(),
    request = require("request");

app.use(express.static("partials"));
app.use(express.static("public"));
app.set("view engine", "ejs");
    
app.get("/", function(req, res){
    res.render("home"); 
});

app.get("/results", function(req, res){
     var searchTerm = req.query.searchTerm;
     var endpoint = "http://www.omdbapi.com/?s="+searchTerm;
     request(endpoint,function(error, response, body){
         if (!error && response.statusCode === 200){
             var parsedData = JSON.parse(body);
             if(!parsedData["Search"]){
                 res.render("queryNotFound",{searchTerm: searchTerm});
             }else{
                 res.render("searchPage", {parsedData: parsedData, searchTerm: searchTerm});
             }
         }
         else{
             console.log("Something went wrong");
             console.log(error);
         }
     });
});

app.listen(process.env.PORT, process.env.IP);