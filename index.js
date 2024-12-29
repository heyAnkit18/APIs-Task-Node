const express = require("express");
const app = express();
const port = 5000;
const fs = require('fs');
const bodyParser = require('body-parser');
const users = require("./MOCK_DATA.json");



app.use(bodyParser.json()); // Middleware to parse JSON body


//routes

//all users
app.get("/api/users", (req, res) => {
  res.json(users);
});

//user by id
app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  res.json(user);
});

//create new user
app.post("/api/users", (req, res) => {
    const body =req.body;
    users.push({...body, id: users.length+1});
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
        res.json({status:"success",id: users.length});
    })
  
});

//Display first name with html page render
app.get("/users", (req, res) => {
  const html = `
    <ul> ${users.map((users) => `<li>${users.first_name}</li>`).join("")}  </ul>
    `;
  res.send(html);
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
