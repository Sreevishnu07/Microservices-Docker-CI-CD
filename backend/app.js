const express=require("express");
const mysql=require("mysql2");
const app=express();
const PORT=5000;
let db;
function connectionWithRetry(){
  console.log("Trying to connect to db");
  db=mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME
  });
  db.connect((err)=>{
    if(err){
      console.log("DB not ready,try again in 3sec");
      setTimeout(connectionWithRetry,3000);
    }else{
      console.log("Connected to MYSQL");
    }
  });
}
connectionWithRetry();
app.get("/api/data",(req,res)=>{
  db.query("SELECT 'Hello from mysql' AS message",(err,results)=>{
    if(err){
      res.status(500).send("DB error");
      return;
    }
    res.json(results);
  });
});
app.listen(PORT,()=>{
  console.log(`Backend running on ${PORT}`);
});
