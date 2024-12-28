const express = require("express");
const app = express();
const port = 5000;
const users = require("./MOCK_DATA.json");

//routes

//all users
app.get("/api/users", (req, res) => {
    res.json(users);
  });

//user by id
app.get("/api/users/:id", (req, res) => {
    const id=Number(req.params.id);
    const user=users.find((user)=>user.id===id);
    res.json(user);
  });



//Display first name with html page render
app.get("/users",(req,res)=>{
    const html=`
    <ul> ${users.map((users)=>`<li>${users.first_name}</li>`).join("")}  </ul>
    `
    res.send(html)
})
  
app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
