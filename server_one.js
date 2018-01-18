var express=require("express");
var app=express();
var mongojs=require("mongojs");
var db=mongojs('contactlist',['contactlist']);
// It is uses to connect mongodb 
var bodyparser=require('body-parser');
//body-parser is a npm which will display the raw json file.

/*app.get('/',function(req,res)
{
res.send("hello hii all world from server.js");
//res.send("iam gyantosh kumar"); 
});*/
app.use(express.static(__dirname+"/public"));
//it is library in express in which we can use any html or css (static file) to run the program on server.
app.use(bodyparser.json());
//use  json file into database.
 app.get('/contactlist',function(req,res) {
	console.log("i recieved a get request")
	/* person1={
                name:'Gyan',
                email:'gyan@gmail.com',
                number:'8802977975'
     };

      person2={
                name:'aadi',
                email:'aadi@gamil.com',
                number:'898857467'
       };

       person3={
                name:'hjfhsdg',
                email:'fjdgf@gmail.com',
                number:'746576347'
                };

              var contactlist =  [person1, person2, person3];
              //$scope.contactlist=contactlist;
              res.json(contactlist);*/
              db.contactlist.find(function(err,docs)
              {
              	console.log(docs);
              	res.json(docs);
              })
});
 app.post('/contactlist',function(req,res)
 {
 	console.log(req.body);
 	db.contactlist.insert(req.body,function(err,doc)
 	{
 		res.json(doc);
 	})
});
 
 app.delete('/contactlist/:id',function(req,res)
 {
 	var id=req.params.id;
 	console.log(id);
 	db.contactlist.remove({_id:mongojs.ObjectId(id)},function(err,doc)
 		{
 			res.json(doc);
 		})
 });
 app.get('/contactlist/:id',function(req,res)
 {
 	var id=req.params.id;
 	console.log(id);
 	db.contactlist.findOne({_id: mongojs.ObjectId(id)},function(err,doc)
 		{
 			res.json(doc);
 		})
 });
 app.put('/contactlist/:id',function(req,res){
 	var id =req.params.id;
 	console.log(req.body.name);
 	db.contactlist.findAndModify({query: {_id:mongojs.ObjectId(id)},
update: {$set: {name:req.body.name, email:req.body.email, number:req.body.number}},
new:true},function(err,doc)
{
	res.json(doc);
});

 });    
app.listen(3000,function()
	{
		console.log("ready on port");
	});
console.log("server running on port 3000");  
/* 
var http = require('http');
var dt = require('./myfirstmodule');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write("The date and time is currently: " + dt.myDateTime());
    res.end();
}).listen(8080);*/
  