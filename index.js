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

//edit user with id 
app.patch("/api/users/:id", (req, res) => {
  const id = Number(req.params.id); // Get the user ID from the URL
  const updates = req.body; // Get the updates from the request body

  // Find the user by ID
  const user = users.find(user => user.id === id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // Update the user with the new data
  Object.assign(user, updates);

  // Write updated data back to the file
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to update user" });
    }

    res.json({ status: "success", user });
  });
});

//Delete the user with id
app.delete("/api/users/:id", (req, res) => {
  const id = Number(req.params.id); // Get the user ID from the URL

  // Find the index of the user by ID
  const userIndex = users.findIndex(user => user.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  // Remove the user from the array
  const deletedUser = users.splice(userIndex, 1)[0];

  // Write updated data back to the file
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to delete user" });
    }

    res.json({ status: "success", user: deletedUser });
  });
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
