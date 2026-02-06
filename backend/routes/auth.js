const router = require("express").Router();
const db = require("../db");

router.post("/register",(req,res)=>{

 console.log("BODY:",req.body);

 const {username,password,name,phone,blood_group,age,city}=req.body;

 if(!username || !password){
   return res.json({status:"error",message:"Missing Fields"});
 }

 db.query(
  "INSERT INTO users(username,password,name,phone,blood_group,age,city) VALUES(?,?,?,?,?,?,?)",
  [username,password,name,phone,blood_group,age,city],
  (err,result)=>{
    if(err){
      console.log("DB ERROR:",err);
      return res.json({status:"error",message:"Database Error"});
    }

    res.json({status:"success",message:"Registered Successfully"});
  }
 );
});

module.exports = router;

// LOGIN
router.post("/login", (req,res)=>{

 console.log("LOGIN BODY:", req.body);

 const { username, password } = req.body;

 if(!username || !password){
   return res.json({status:"error", message:"Missing Fields"});
 }

 db.query(
   "SELECT * FROM users WHERE username=? AND password=?",
   [username, password],
   (err, result) => {

     if(err){
       console.log("LOGIN DB ERROR:", err);
       return res.json({status:"error", message:"Database Error"});
     }

     if(result.length > 0){
       res.json({
         status:"success",
         message:"Login Successful",
         user: result[0]
       });
     } else {
       res.json({
         status:"fail",
         message:"Invalid Username or Password"
       });
     }
   }
 );
});
