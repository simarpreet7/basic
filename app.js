var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/node-demo",{   useNewUrlParser: true,
useUnifiedTopology: true,
useCreateIndex: true,
useFindAndModify: false });
var nameSchema = new mongoose.Schema({
    firstName: String,
    lastName: String
});
app.set("view engine", "ejs");
var User = mongoose.model("User", nameSchema);

app.get("/", (req, res) => {
       User.find({},function(err,docs){
           if(err) 
           res.send("wow")
           else
         res.render("index",{wow:docs});
        //res.send(docs)
       }); 
     

});

app.post("/addname", (req, res) => {
    var myData = new User(req.body);
    myData.save()
        .then(item => {
            res.redirect('/');
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});

app.post("/deletename/:id", (req, res) => {
    User.remove({_id:req.params.id})
        .then(item => {
            res.redirect('/');
        })
        .catch(err => {
            res.status(400).send("Unable to delete to database");
        });
});

app.post("/updatename", (req, res) => {
    let update={
        firstName:req.body.firstName,
        lastName:req.body.lastName,
    }
    User.update({_id:req.body.userid},update)
        .then(item => {
            res.redirect('/');
        })
        .catch(err => {
            res.status(400).send("Unable to delete to database");
        });
});
app.listen(port, () => {
    console.log("Server listening on port " + port);
});