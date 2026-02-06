const router = require("express").Router();
const db = require("../db");

router.post("/register", (req,res)=>{

 console.log("BODY RECEIVED:", req.body);   // ⭐

 const {username,password,name,phone,blood_group,age,city} = req.body;

 db.query(
  "INSERT INTO users(username,password,name,phone,blood_group,age,city) VALUES(?,?,?,?,?,?,?)",
  [username,password,name,phone,blood_group,age,city],
  (err,result)=>{
   if(err){
     console.log("DB ERROR:", err);
     return res.json({status:"error", message:"DB Error"});
   }

   console.log("INSERTED");
   res.json({status:"success", message:"Registered Successfully"});
  }
 );
});

// LOGIN
router.post("/login",(req,res)=>{
 const {username,password}=req.body;

 db.query(
  "SELECT * FROM users WHERE username=? AND password=?",
  [username,password],
  (err,result)=>{
   if(err) return res.status(500).send(err);

   if(result.length>0){
     res.json({status:"success", user_id:result[0].id});
   }else{
     res.json({status:"fail"});
   }
  }
 );
});

module.exports = router;
