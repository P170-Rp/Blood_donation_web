const router = require("express").Router();
const db = require("../db");
const bcrypt = require("bcryptjs");

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

// 🩸 BLOOD BANK REGISTER
router.post("/bloodbank/register", (req, res) => {

  const { name, reg_number, email, mobile, city, state, password } = req.body;

  if (!name || !email || !password) {
    return res.json({ status: "error", message: "Missing Fields" });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const sql = `
    INSERT INTO blood_banks
    (name, reg_number, email, mobile, city, state, password)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [name, reg_number, email, mobile, city, state, hashedPassword],
    (err, result) => {
      if (err) {
        console.log("DB ERROR:", err);
        return res.json({ status: "error", message: "Email already exists" });
      }

      res.json({
        status: "success",
        message: "Blood Bank Registered Successfully"
      });
    }
  );
});

// 🩸 BLOOD BANK LOGIN
router.post("/bloodbank/login", (req, res) => {

  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ status: "error", message: "Missing Fields" });
  }

  db.query(
    "SELECT * FROM blood_banks WHERE email = ?",
    [email],
    (err, result) => {

      if (err) {
        console.log("LOGIN DB ERROR:", err);
        return res.json({ status: "error", message: "Database Error" });
      }

      if (result.length === 0) {
        return res.json({ status: "error", message: "Email not registered" });
      }

      const bloodBank = result[0];

      // 🔐 password check
      const isMatch = bcrypt.compareSync(password, bloodBank.password);

      if (!isMatch) {
        return res.json({ status: "error", message: "Invalid Password" });
      }

      // ✅ blood bank login success
      res.json({
        status: "success",
        message: "Login Successful",
        bloodBank: {
          id: bloodBank.id,
          name: bloodBank.name,
          email: bloodBank.email
        }
      });
    }
  );
});
