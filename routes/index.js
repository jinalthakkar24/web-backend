var express = require('express');
var router = express.Router();
var fs=require('fs');

router.get('/', function(req, res, next) {
  res.render('index');
});

//add student
router.post("/addstudent",function(req,res,next){
  //add json file path(All json file stored in student_data directory)
  var file_path="student_data/"+req.body.enu+".json";
  //store student data in content variable
  var content=req.body;
  //Using fs module create/write data in json file(if file is not exist then its create automatically)
  //json.stringify:-using stringify convert object to json string
  fs.writeFile(file_path,JSON.stringify(content),function(err){
    if(err) throw err;
  
    console.log("Data Saved");
  });  
});

//go to getbyid page on which i enter enrollment number of student which i want to show
router.get("/getStudent",function(req,res,next){
  res.render("getByid.hbs");
});

router.post("/student",function(req,res,next){
  //if text box is specify enrollment number then display that student data
  if(req.body.enu!=""){
    //file path of student data file which we want to see
    var file_path="student_data/"+req.body.enu+".json";
    //fs.readfile is used to read the file
    fs.readFile(file_path,function(err,data){
      if(err) throw err;
      //pass json data to student constant
      const student=JSON.parse(data);
      console.log(student);
    });
  }
  //if there is no specific enrollment nu mentioned than  else part display all the json files data
  else{

    const testFolder = './student_data/';
    
    //read stuudent_data directory and get all file name and their data 
    fs.readdir(testFolder, (err, files) => {
      files.forEach(file => {
        console.log(file);
        //perform forech loop and display all the data as per file name from studet_data directory
        fs.readFile("student_data/"+file,function(err,data){
          if(err) throw err;
          const student=JSON.parse(data);
          //display all files data in console
          console.log(student);
        });
      });
    });
  }
  

});

//we wite in url like: /updateStudent/1
  //then it go to updateStudent page with values of that specific json file(Which we specified as a parameter)
router.get("/updateStudent/:id",function(req,res,next){
  var file_path="student_data/"+req.params.id+".json";
  fs.readFile(file_path,function(err,data){
    if(err) throw err;
    const student=JSON.parse(data);
    console.log(student);
    //pass the data of specified student to the hbs file
    res.render("update_studentByid.hbs",{data:student});
  });
  
});

//Update specified json file student data as per we enter 
router.post("/updatestudent",function(req,res,next){
  var file_path="student_data/"+req.body.enu+".json";
  var content=req.body;
  //write updated data to enu.json file 
  fs.writeFile(file_path,JSON.stringify(content),function(err){
    if(err) throw err;
   
    console.log("Data Updated");
  });
});
module.exports = router;
