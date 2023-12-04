require("dotenv").config();
const express = require("express");
const cors=require('cors');
const db=require('./db');

// const morgan = require("morgan");

const app = express();

app.use(cors());
// app.use(morgan('tiny'));
app.use(express.json());
// get all restaurants
app.get("/api/v1/restaurants", async(req, res) => {
 try{
  const results=await db.query("select * from restaurants")
  res.status(200).json({
  status: "success",
  results:results.rows.length,

  data: {
    restaurants: results.rows
  },
});
   
 }catch(err){
console.log(err);
}
   
});

// get a restautants

app.get("/api/v1/restaurants/:id", async(req, res) => {
  console.log(req.params.id);
  try{
  const results=await db.query(`select * from restaurants where id = $1`,[req.params.id])
  res.status(200).json({
  status: "success",
  data: {
    restaurants: results.rows[0],
  },
});
  }catch(err){
  console.log(err);
  }

 
});


//add new restaurnats
app.post("/api/v1/restaurants", async(req, res) => {
  try{
const results=await db.query("INSERT INTO restaurants (name,location,price_range) VALUES ($1,$2,$3) returning *",[req.body.name,req.body.location,req.body.price_range]);
console.log(results);
res.status(200).json({
  status: "success",
  data: {
    restaurants: results.rows[0],
  },
});
  }catch(err){
console.log(err);
  }
});

app.put("/api/v1/restaurants/:id", async(req, res) => {
  try{
    const results=await db.query("UPDATE  restaurants SET name=$1, location=$2, price_range=$3 WHERE id=$4 returning *",[req.body.name, req.body.location,
      req.body.price_range, req.params.id] );
    res.status(200).json({
      status: "success",
      data: {
        restaurants:results.rows[0],
      },
    });


  }catch(err){
    console.log(err);
  }
  console.log(req.body);
  
});


app.delete("/api/v1/restaurants/:id",async(req,res)=>{
  try{
const results=await db.query("DELETE FROM restaurants WHERE id=$1",[req.params.id]);

res.status(204).send(
  {
      status:"success"
  }
          );
  }catch(err){
console.log(err);
  }
})

const port = process.env.PORT;

app.listen(port, () => console.log("server is up"));
